import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { ERROR_MESSAGE } from '../../core/error-messages';
import { User } from '../../types/interface';

@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findUserById(id: number): Promise<User | undefined> {
    try {
      const user = this.knex<User>('user').where('id', id).first();
      if (!user) throw new NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
      return user;
    } catch (err) {
      throw new BadRequestException(ERROR_MESSAGE.USER.NOT_FOUND);
    }
  }

  async findAllUsers(): Promise<User[] | undefined> {
    try {
      const user = this.knex<User>('user');
      if (!user) throw new NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
      return user;
    } catch (err) {
      throw new BadRequestException(ERROR_MESSAGE.USER.NOT_FOUND);
    }
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = this.knex<User>('user').where('email', email).first();
      if (!user) throw new NotFoundException(ERROR_MESSAGE.USER.NOT_FOUND);
      return user;
    } catch (err) {
      throw new BadRequestException(ERROR_MESSAGE.USER.NOT_FOUND);
    }
  }
}
