import { AuthService } from '@/auth/auth.service';
import { LoginDto } from '@/auth/dtos/login.dto';
import { RegisterDto } from '@/auth/dtos/register.dto';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { ClassGuard } from '@/auth/guards/class.guard';
import { MethodGuard } from '@/auth/guards/method.guard';
import { Public } from '@/common/decorators/public.decorator';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  SetMetadata,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';

// @UseGuards(AuthGuard)

// @UseGuards(ClassGuard)
// @SetMetadata('PUBLIC', false)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  // @SetMetadata('PUBLIC', true)
  @Post('register') // POST /auth/register
  async register(
    @Body() registerDto: RegisterDto
  ): Promise<{ message: string }> {
    await this.authService.register(registerDto);
    return { message: 'Account created' };
  }

  @Public()
  // @SetMetadata('PUBLIC', true)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginDto: LoginDto
  ): Promise<{ access_token: string; refresh_token: string }> {
    return this.authService.login(loginDto);
  }

  // GET /auth/me
  // @UseGuards(MethodGuard)

  @Get('me')
  getMe(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    // req.user
    res.cookie('refresh_token', '');
    // res.status(200).json('Hello');
    return 'GET /auth/me';
  }

  @Patch('change-password')
  changePassword() {
    return 'PATCH /auth/chang-password';
  }
}
