import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard';
import { IGetUserAuthInfoRequest, Transaction } from 'types/interface';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('history')
  async getWalletBalance(
    @Request() req: IGetUserAuthInfoRequest,
  ): Promise<Transaction[]> {
    return this.transactionService.transactionHistory(req.user.userId);
  }
}
