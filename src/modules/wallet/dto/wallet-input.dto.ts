import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWalletDto {
  @IsNotEmpty()
  userId: number;
}

export class TransferFundDto {
  @IsNotEmpty()
  @IsEmail()
  recipientEmail: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
