import { NextFunction, Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import { verify, sign, decode } from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException';
import User from '../models/User';
import Keys from '../keys';
import emailMocks from '../utils/email';
import sendEmail from '../utils/nodemailer';

class AuthController {
  static signUp = async (req: Request, res: Response) => {
    try {
      const userData = req.body;

      const { referralCode } = userData;

      let referrer;
      if (referralCode) {
        referrer = await User.findOne({ referralCode });
        if (!referrer) {
          throw new HttpException(400, 'Invalid referral code');
        }
      }

      const findUser = await User.findOne({
        email: userData.email,
      }).exec();
      if (findUser)
        throw new HttpException(
          409,
          `This email ${userData.email} already exists`,
        );

      const hashedPassword = await hash(userData.password, 10);
      const createUserData = new User({
        ...userData,
        referralCode: AuthController.generateReferralCode(),
        referrer: referrer ? referrer._id : null,
        password: hashedPassword,
      });

      const signUpUserData = await createUserData.save();

      if (referrer) {
        referrer.invitedFriends.push(signUpUserData._id);
        await referrer.save();
      }

      const { token } = AuthController.createToken(
        signUpUserData._id.toString(),
        signUpUserData.email,
        signUpUserData.role,
        signUpUserData.firstName,
      );

      const message = emailMocks.verifyAccount(
        signUpUserData.firstName,
        token,
      );
      const subject = 'Account Verification';
      sendEmail(signUpUserData.email, subject, message);

      res
        .status(201)
        .json({ data: signUpUserData, message: 'signup' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static logIn = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userData: any = req.body;

      const findUser = await User.findOne({
        email: userData.email,
      });
      if (!findUser)
        throw new HttpException(
          409,
          `Invalid login credentials. Please check your email and password and try again.`,
        );

      const isPasswordMatching: boolean = await compare(
        userData.password,
        findUser.password,
      );
      if (!isPasswordMatching)
        throw new HttpException(
          409,
          'Invalid login credentials. Please check your email and password and try again.',
        );

      if (!findUser.verified)
        throw new HttpException(
          400,
          `This email ${userData.email} was not verified, please check your email and follow instructions.`,
        );

      const tokenData = AuthController.createToken(
        findUser._id.toString(),
        findUser.email,
        findUser.role,
        findUser.firstName,
      );
      const cookie = AuthController.createCookie(tokenData);

      res.setHeader('Set-Cookie', [cookie]);
      res
        .status(200)
        .json({ data: findUser, tokenData, message: 'login' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static logOut = async (req: any, res: Response) => {
    try {
      const userData = req.user;
      const findUser = await User.findOne({
        email: userData.email,
        password: userData.password,
      }).exec();
      if (!findUser)
        throw new HttpException(409, "User doesn't exist");

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: findUser, message: 'logout' });
    } catch (error: any) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  };

  static createToken(
    id: string,
    email: string,
    role: string,
    firstName: string,
  ) {
    const dataStoredInToken = {
      id,
      email,
      role,
      firstName,
    };
    const secretKey: string = Keys.SECRET_KEY;
    const expiresIn: number | string = Keys.TOKEN_EXPIRES_IN;

    return {
      expiresIn,
      token: sign(dataStoredInToken, secretKey, { expiresIn }),
    };
  }

  static createCookie(tokenData: any): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  static decode = (token: string) => {
    const payload = verify(token, Keys.SECRET_KEY);
    return payload;
  };

  static async forgettingPassword(req: Request, res: Response) {
    let { email } = req.body;
    try {
      email = email.toLowerCase().trim();
      const user = await User.findOne({ email });
      if (!user) {
        throw new HttpException(409, 'user not found, signup');
      }

      const { token } = AuthController.createToken(
        user._id.toString(),
        user.email,
        user.role,
        user.firstName,
      );
      const message = emailMocks.forgetPassword(token);
      const subject = 'Reset Password';
      sendEmail(user.email, subject, message);
      res.status(200).json({
        message: 'check your email',
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  }

  static async resetingPassword(req: Request, res: Response) {
    const { password, token } = req.body;
    try {
      const decoded: any = AuthController.decode(token);
      const { id } = decoded;
      let user = await User.findById(id);
      if (!user) {
        throw new HttpException(409, 'user not found, signup');
      }
      const hashPassword = await hash(password, 12);

      user.set({ password: hashPassword });
      user = await user.save();
      res.status(201).json({
        message: 'password updated',
      });
    } catch (error) {
      res.status(error?.status || 500).json({
        message: error?.message || 'something went wrong',
      });
    }
  }

  static async confirmAccount(req: Request, res: Response) {
    const { token } = req.body;
    try {
      const decodedToken: any = decode(token);
      if (!decodedToken) {
        throw new HttpException(
          400,
          'Your verification link may have expired.',
        );
      }
      let user = await User.findById(decodedToken.id);
      if (!user) {
        throw new HttpException(401, 'user not found, signup first');
      }

      if (user.verified) {
        res.status(200).json({
          message: 'user verified, login',
          data: user,
        });
      } else {
        user.verified = true;
        user = await user.save();

        res.status(200).json({
          message: 'verified successfully',
          data: user,
        });
      }
    } catch (err: any) {
      const message = err.message || 'something went wrong';
      res.status(err?.status || 500).json({
        message: err?.message || 'something went wrong',
      });
    }
  }

  static generateReferralCode() {
    // Generate a random string of 6 characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i += 1) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }
}

export default AuthController;
