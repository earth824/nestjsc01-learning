import { AuthService } from '@/auth/auth.service';
import { PrismaService } from '@/prisma/prisma.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly prismaService: PrismaService
  ) {}

  findByName(name: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { name } });
  }

  async create(data: Prisma.UserCreateInput): Promise<void> {
    await this.prismaService.user.create({ data });
  }
}
