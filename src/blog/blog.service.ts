import { IBlogRepository } from '@/blog/blog.module';
import { BlogRepository } from '@/blog/blog.repository';
import { CreateBlogDto } from '@/blog/dtos/create-blog.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

// Nest Injection
@Injectable()
export class Blogservice {
  // SOLID S ==> single responsibiltu
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('BlogRepository') private readonly blogRepository: IBlogRepository
  ) {
    console.log('Created');
  }

  async findAll() {
    // query from DB
    const result = await this.prismaService.blog.findMany(); // SELECT * FROM blog
    console.log(result);
  }

  async create(createBlogDto: CreateBlogDto) {
    // const newBlog = await this.prismaService.blog.create({
    //   data: createBlogDto
    // });
    const newBlog = await this.blogRepository.create(createBlogDto);
    return newBlog;
  }
}
