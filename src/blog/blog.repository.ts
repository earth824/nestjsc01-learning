import { IBlogRepository } from '@/blog/blog.module';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogRepository implements IBlogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: { content: string; userId: string }) {
    return await this.prismaService.blog.create({ data });
  }
}
