import 'dotenv/config';

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};

export const TransactionDescription = {
  fund: 'funded wallet',
  transfer: 'fund transfer',
  withrawal: 'fund withdrawal',
};
