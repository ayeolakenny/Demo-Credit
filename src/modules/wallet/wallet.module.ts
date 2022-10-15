import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { TransactionModule } from 'modules/transaction/transaction.module';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [TransactionModule, UserModule],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
