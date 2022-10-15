import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    UserModule,
    WalletModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRATION },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
