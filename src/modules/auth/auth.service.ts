import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { User } from '../../types/interface';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/auth-input.dto';
import { ERROR_MESSAGE } from '../../core/error-messages';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private walletService: WalletService,
    private jwtService: JwtService,
    @InjectModel() private readonly knex: Knex,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<User | undefined> {
    const user = await this.userService.findUserByEmail(email);
    if (!user) return null;
    const userPass = user.passwordHash;
    if (await argon2.verify(userPass, password)) {
      const { passwordHash, ...rest } = user;
      return rest;
    }
    return null;
  }

  async signup(input: CreateUserDto): Promise<Boolean> {
    const { email, name, password } = input;
    try {
      const emailTaken = await this.userService.findUserByEmail(email);
      if (emailTaken) {
        throw new ConflictException(ERROR_MESSAGE.AUTH.EMAIL_TAKEN);
      }
      const hashedPassword = await argon2.hash(password);
      await this.knex<User>('user').insert({
        email,
        name,
        passwordHash: hashedPassword,
      });
      const user = await this.userService.findUserByEmail(email);
      await this.walletService.create({ userId: user.id });
      return true;
    } catch (err) {
      if (err) throw new BadRequestException(err);
      else throw new BadRequestException(ERROR_MESSAGE.AUTH.GENERAL);
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
