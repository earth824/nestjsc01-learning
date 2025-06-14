import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dtos/login.dto';
import { RegisterDto } from '@/auth/dtos/register.dto';
import { AuthGuard } from '@/auth/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';

// @UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // POST /auth/register
  async register(
    @Body() registerDto: RegisterDto
  ): Promise<{ message: string }> {
    await this.authService.register(registerDto);
    return { message: 'Account created' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginDto: LoginDto
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.login(loginDto);
  }

  // GET /auth/me
  @Get('me')
  getMe() {
    return 'GET /auth/me';
  }

  @Patch('change-password')
  changePassword() {
    return 'PATCH /auth/chang-password';
  }
}
