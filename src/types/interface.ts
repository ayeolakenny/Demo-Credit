import { Request } from 'express';
import { TRANSACTION_STATUS } from './enum';

interface dbConnectionParameters {
  host: string;
  user: string;
  password: string;
  database: string;
}

export interface dbConfigInterface {
  client: string;
  version: string;
  useNullAsDefault: boolean;
  connection: dbConnectionParameters;
}

export interface Transaction {
  id: number;
  initiator: number;
  status: TRANSACTION_STATUS;
  reference: string;
  description: string;
  recipient?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  id: number;
  balance: number;
  userId: number;
  createdAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  passwordHash?: string;
  wallet: Wallet;
  createdAt: string;
  updatedAt: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user: { userId: number; email: string };
}
