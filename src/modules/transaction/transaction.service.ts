import { BadRequestException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Transaction } from 'types/interface';
import { CreateTransactionDto } from './dto/transaction-input.dto';
import { generateRandomString } from 'util/generateRandomString.util';

@Injectable()
export class TransactionService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(input: CreateTransactionDto) {
    const { description, recipient, userId, status } = input;
    const reference = generateRandomString();
    try {
      await this.knex<Transaction>('transaction').insert({
        initiator: userId,
        recipient: recipient ? recipient : null,
        status,
        reference,
        description,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async transactionHistory(userId: number) {
    return this.knex<Transaction>('transaction')
      .where('initiator', userId)
      .orWhere('recipient', userId);
  }
}
