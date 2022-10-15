import { BadRequestException, Injectable } from '@nestjs/common';
import { TransactionDescription } from '../../constants';
import { Knex } from 'knex';
import { TransactionService } from 'modules/transaction/transaction.service';
import { InjectModel } from 'nest-knexjs';
import { Wallet } from '../../types/interface';
import { CreateWalletDto, TransferFundDto } from './dto/wallet-input.dto';
import { UserService } from 'modules/user/user.service';
import { ERROR_MESSAGE } from 'core/error-messages';
import { TRANSACTION_STATUS } from 'types/enum';

@Injectable()
export class WalletService {
  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    @InjectModel() private readonly knex: Knex,
  ) {}

  async create(input: CreateWalletDto) {
    const { userId } = input;
    try {
      await this.knex<Wallet>('wallet').insert({
        balance: 0,
        userId,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getUserWallet(userId: number) {
    try {
      return await this.knex<Wallet>('wallet').where('userId', userId).first();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getUserWalletBalance(userId: number) {
    try {
      const userWallet = await this.getUserWallet(userId);
      return userWallet.balance;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async fundAccount(userId: number, amount: number) {
    try {
      await this.knex<Wallet>('wallet')
        .where('userId', '=', userId)
        .increment('balance', amount);
      await this.transactionService.create({
        description: TransactionDescription.fund,
        status: TRANSACTION_STATUS.SUCCESSFUL,
        recipient: userId,
        userId,
      });
      return true;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async transferFund(input: TransferFundDto, userId: number) {
    const { amount, recipientEmail } = input;
    try {
      const user = await this.userService.findUserByEmail(recipientEmail);
      if (!user) {
        await this.transactionService.create({
          description: TransactionDescription.transfer,
          recipient: user.id,
          status: TRANSACTION_STATUS.SUCCESSFUL,
          userId,
        });
        throw new BadRequestException(ERROR_MESSAGE.USER.NOT_FOUND);
      }
      const userWallet = await this.getUserWallet(userId);
      if (userWallet.balance < amount) {
        await this.transactionService.create({
          description: TransactionDescription.transfer,
          recipient: user.id,
          status: TRANSACTION_STATUS.FAILED,
          userId,
        });
        throw new BadRequestException(ERROR_MESSAGE.WALLET.INSUFFICIENT_FUND);
      }
      console.log(user.id);
      await this.knex<Wallet>('wallet')
        .where('userId', '=', userId)
        .decrement('balance', amount);
      await this.knex<Wallet>('wallet')
        .where('userId', '=', user.id)
        .increment('balance', amount);
      await this.transactionService.create({
        description: TransactionDescription.transfer,
        recipient: user.id,
        status: TRANSACTION_STATUS.SUCCESSFUL,
        userId,
      });
      return true;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async withdrawFund(userId: number, amount: number) {
    try {
      const userWallet = await this.getUserWallet(userId);
      if (userWallet.balance < amount) {
        await this.transactionService.create({
          description: TransactionDescription.withrawal,
          recipient: userId,
          status: TRANSACTION_STATUS.FAILED,
          userId,
        });
        throw new BadRequestException(ERROR_MESSAGE.WALLET.INSUFFICIENT_FUND);
      }
      await this.knex<Wallet>('wallet')
        .where('userId', '=', userId)
        .decrement('balance', amount);
      await this.transactionService.create({
        description: TransactionDescription.withrawal,
        recipient: userId,
        status: TRANSACTION_STATUS.SUCCESSFUL,
        userId,
      });
      return true;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
