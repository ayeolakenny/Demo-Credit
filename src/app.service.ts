import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Lendsqr Demo Credit backend project api!';
  }
}
