import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { HttpException } from '../exceptions/HttpException';
import { IMTNRequestBody } from '../exceptions/mtn';
import { RequestWithUser } from '../interfaces/auth.interface';
import Transaction from '../models/Transaction';
import Wallet from '../models/Wallet';
import Http from '../utils/http';

export default class MTNController {
  static requestPay = async (req: RequestWithUser, res: Response) => {
    try {
      const { amount, currency, partyId, payerMessage, payeeNote } =
        req.body;
      const payload: IMTNRequestBody = {
        amount,
        currency,
        externalId: req.user._id,
        payerMessage,
        payeeNote,
        payer: {
          partyIdType: 'MSISDN',
          partyId,
        },
      };

      const referenceId = uuidv4();
      // console.log(referenceId);

      const { data, status } = await Http.requestPayment(
        referenceId,
        payload,
      );

      if (!status) {
        throw new HttpException(500, 'Payment failed');
      }

      await Transaction.create({
        user: req.user._id,
        referenceId,
        mode: 'mtnrwanda',
        status: 'PENDING',
        action: 'deposit',
        amount: payload.amount,
        currency: payload.currency,
      });

      res
        .status(status)
        .json({ data, referenceId, message: 'requesting payment' });
    } catch (error: any) {
      // console.log(error);
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static transactionStatus = async (
    req: RequestWithUser,
    res: Response,
  ) => {
    try {
      const { referenceId } = req.params;

      const { data, status } = await Http.transactionStatus(
        referenceId as string,
      );

      if (!status) {
        throw new HttpException(500, 'Payment failed');
      }

      const order = await Transaction.findOne({
        referenceId,
        user: req.user._id,
      });
      const wallet = await Wallet.findOne({ user: req.user._id });

      if (!order) {
        throw new HttpException(500, 'Transaction is not found');
      }

      if (
        data?.status === 'SUCCESSFUL' &&
        order.status === 'PENDING'
      ) {
        order.set({ status: data?.status || 'SUCCESSFUL' });
        await order.save();

        if (Number(data.amount)) {
          wallet.set({
            balance: wallet.balance + Number(data.amount),
          });
        }
      } else if (data?.status === 'FAILED') {
        order.set({ status: 'FAILED' });
        await order.save();
      }

      res.status(status).json({
        data,
        referenceId,
        message: 'transaction status',
      });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };
}
