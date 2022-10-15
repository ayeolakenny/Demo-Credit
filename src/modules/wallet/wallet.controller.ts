import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guard';
import { IGetUserAuthInfoRequest } from 'types/interface';
import { TransferFundDto } from './dto/wallet-input.dto';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Post('fund')
  async fundAccount(
    @Request() req: IGetUserAuthInfoRequest,
    @Body() input: { amount: number },
  ): Promise<Boolean> {
    return this.walletService.fundAccount(req.user.userId, input.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Post('transfer')
  async transferFund(
    @Request() req: IGetUserAuthInfoRequest,
    @Body() input: TransferFundDto,
  ): Promise<Boolean> {
    return this.walletService.transferFund(input, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('withdraw')
  async withdrawFund(
    @Request() req: IGetUserAuthInfoRequest,
    @Body() input: { amount: number },
  ): Promise<Boolean> {
    return this.walletService.withdrawFund(req.user.userId, input.amount);
  }

  @UseGuards(JwtAuthGuard)
  @Get('balance')
  async getWalletBalance(
    @Request() req: IGetUserAuthInfoRequest,
  ): Promise<Number> {
    return this.walletService.getUserWalletBalance(req.user.userId);
  }
}
