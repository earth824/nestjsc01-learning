import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dtos/login.dto';
import { RegisterDto } from '@/auth/dtos/register.dto';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

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
}
