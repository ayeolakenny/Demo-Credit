import { IsEnum, IsNotEmpty } from 'class-validator';
import { TRANSACTION_STATUS } from 'types/enum';

export class CreateTransactionDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  recipient: number;

  @IsEnum(TRANSACTION_STATUS)
  status: TRANSACTION_STATUS;
}
