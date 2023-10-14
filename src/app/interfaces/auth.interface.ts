import { Request, Express } from 'express';
import { User } from './users.interface';

export interface DataStoredInToken {
  id: string;
  email: string;
}

export interface TokenData {
  token: string;
  expiresIn: number | string;
}

export interface IAdminWallet extends User {
  isMain: boolean;
  expenses: Number;
  income: Number;
  balance: Number;
}

export interface IGlobalSetting {
  coinToRwf: number;
}

export interface RequestWithUser extends Request {
  user: User;
  files: Express.Multer.File[];
  file: Express.Multer.File;
  pagination: {
    offset: number;
    limit: number;
    page: number;
  };

  adminWallet: IAdminWallet | null;

  globalSetting: IGlobalSetting;
}
