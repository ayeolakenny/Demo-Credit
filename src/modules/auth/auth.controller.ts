import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { IGetUserAuthInfoRequest } from '../../types/interface';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/auth-input.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() input: CreateUserDto): Promise<Boolean> {
    return this.authService.signup(input);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: IGetUserAuthInfoRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: IGetUserAuthInfoRequest) {
    return req.user;
  }
}
