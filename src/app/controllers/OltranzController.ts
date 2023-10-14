import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { HttpException } from '../exceptions/HttpException';
import { IOltranzRequestToPay } from '../exceptions/oltranz';
import { RequestWithUser } from '../interfaces/auth.interface';
import Keys from '../keys';
import Transaction from '../models/Transaction';
import Wallet from '../models/Wallet';
import Http from '../utils/http';
import { io } from '..';
import User from '../models/User';
import WithdrawRequest from '../models/WithdrawRequest';

export default class OltranzController {
  static requestPay = async (req: RequestWithUser, res: Response) => {
    try {
      if (!req.adminWallet._id) {
        throw new HttpException(
          401,
          'Wait for admin to set up wallet',
        );
      }
      const payData = req.body;

      const referenceId = uuidv4().replace(/-/gi, '');

      const payload: IOltranzRequestToPay = {
        ...payData,
        organizationId: Keys.OLTRANZ_MERCHANT_ID,
        transactionId: referenceId,
        callbackUrl: `${Keys.HOST}/api/v1/pay/oltranz/callback/paymentrequest`,
      };
      const { data, status } = await Http.oltranzAxios.post(
        '/opay/paymentrequest',
        payload,
      );

      if (!status) {
        throw new HttpException(500, 'Payment failed');
      }

      const transaction = await Transaction.create({
        user: req.user._id,
        referenceId,
        mode: 'oltranz',
        status: data.status,
        action: 'deposit',
        amount: payload.amount,
        currency: 'RWF',
        adminWallet: req.adminWallet._id,
      });

      res.status(status).json({
        data,
        referenceId,
        message: 'requesting payment',
      });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static handleRequestToPayCallback = async (
    req: RequestWithUser,
    res: Response,
  ) => {
    const {
      transactionId,
      statusDescription,
      paidAmount,
      status,
      chargedCommission,
    } = req.body;
    try {
      const transaction = await Transaction.findOne({
        referenceId: transactionId,
      });

      if (!transaction) {
        throw new HttpException(409, 'Transaction is not found');
      }

      const adminWallet = await Wallet.findById(
        transaction.adminWallet,
      );

      if (status === 'SUCCESS') {
        const wallet = await Wallet.findOne({
          user: transaction.user,
        });
        transaction.set({
          status: 'SUCCESSFUL',
          chargedCommission,
          paidAmount,
        });
        await transaction.save();
        wallet.set({
          balance: wallet.balance + Number(paidAmount),
        });
        await wallet.save();

        adminWallet.set({
          balance: adminWallet.balance - Number(chargedCommission),
        });

        io.emit(`payment:done:${transactionId}`, {
          message: statusDescription,
          wallet,
        });
      } else {
        transaction.set({
          status: 'FAILED',
        });
        await transaction.save();
        io.emit(`payment:error:${transactionId}`, {
          message: statusDescription,
        });
      }

      res
        .status(status === 'SUCCESS' ? 200 : 400)
        .json({ message: statusDescription });
    } catch (error: any) {
      io.emit(`payment:error:${transactionId}`, {
        message: 'Payment failed. Please try again.',
      });
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static handleTransferCallback = async (
    req: RequestWithUser,
    res: Response,
  ) => {
    const {
      transactionId,
      status,
      commission,
      statusDescription,
      total,
      transferedAmount,
    } = req.body;
    try {
      const transaction = await Transaction.findOne({
        referenceId: transactionId,
      });

      if (!transaction) {
        throw new HttpException(409, 'Transaction is not found');
      }

      const receiverWallet = await Wallet.findOne({
        user: transaction.user,
      });

      const adminWallet = await Wallet.findById(
        transaction.adminWallet,
      );

      if (status === 'SUCCESS') {
        const withdrawRequest = await WithdrawRequest.findById(
          transaction.withdrawRequestId,
        );
        withdrawRequest.set({
          status: 'APPROVED',
        });
        await withdrawRequest.save();

        transaction.set({
          status: 'SUCCESSFUL',
          commission,
          total,
          transferedAmount,
        });
        await transaction.save();

        adminWallet.set({
          balance: adminWallet.balance + Number(commission),
        });
        await adminWallet.save();

        const paid =
          Number(transferedAmount) + 2 * Number(commission);

        receiverWallet.set({
          balance: receiverWallet.balance - Number(paid),
        });
        await receiverWallet.save();

        io.emit(`transfer:done:${transactionId}`, {
          message: statusDescription,
          receiverWallet,
          adminWallet,
        });
      } else {
        transaction.set({
          status: 'FAILED',
        });
        await transaction.save();
        io.emit(`transfer:done:${transactionId}`, {
          message: statusDescription,
        });
      }

      res
        .status(status === 'SUCCESS' ? 200 : 400)
        .json({ message: statusDescription });
    } catch (error: any) {
      io.emit(`transfer:error:${transactionId}`, {
        message: 'Transfer failed. Please try again.',
      });
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static transfer = async (req: RequestWithUser, res: Response) => {
    try {
      if (!req.adminWallet._id) {
        throw new HttpException(
          401,
          'Wait for admin to set up wallet',
        );
      }

      const {
        _id,
        requester,
        amount,
        receiverAccount,
        receiverPhoneNumber,
        description = 'Transfer',
        type = 'MOBILE',
      } = (req as any).request || req.body;

      const withdrawRequestId = _id || req.body.withdrawRequestId;

      const withdrawRequest = await WithdrawRequest.findById(
        withdrawRequestId,
      );

      if (!withdrawRequest) {
        throw new HttpException(409, 'Withdraw request is not found');
      }

      const receiver = requester || req.body.receiver;

      const referenceId = uuidv4().replace(/-/gi, '');

      const userReceiver = await User.findById(receiver);

      if (!userReceiver) {
        throw new HttpException(400, 'Receiver is not found');
      }

      const payload: Record<string, any> = {
        amount,
        description,
        type,
        receiverAccount: receiverPhoneNumber || receiverAccount,
        merchantId: Keys.OLTRANZ_MERCHANT_ID,
        transactionId: referenceId,
        callbackUrl: `${Keys.HOST}/api/v1/pay/oltranz/callback/fundstransfer`,
      };

      payload.firstName = userReceiver.firstName;
      payload.lastName = userReceiver.lastName;

      const { data, status } = await Http.oltranzAxios.post(
        '/opay/wallet/fundstransfer',
        payload,
        {
          headers: {
            accessKey: Keys.OLTRANZ_ACCESS_KEY,
          },
        },
      );

      if (!status) {
        throw new HttpException(500, 'Payment failed');
      }

      const newTransaction: Record<string, any> = {
        user: receiver,
        referenceId,
        mode: 'oltranz',
        status: data.status,
        action: 'transfer',
        amount: payload.amount,
        currency: 'RWF',
        withdrawRequestId,
        adminWallet: req.adminWallet._id,
      };

      const transaction = await Transaction.create(newTransaction);

      res
        .status(status)
        .json({ data, referenceId, message: 'transfer payment' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
