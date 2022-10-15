import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { devDatabaseConfig } from './config/db.config';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: devDatabaseConfig,
    }),
    AuthModule,
    UserModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
