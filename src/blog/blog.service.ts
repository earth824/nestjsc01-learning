import { IBlogRepository } from '@/blog/blog.module';
import { BlogRepository } from '@/blog/blog.repository';
import { CreateBlogDto } from '@/blog/dtos/create-blog.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';
import { Blog } from '@prisma/client';

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

  async create(createBlogDto: CreateBlogDto, userId: string) {
    // const newBlog = await this.prismaService.blog.create({
    //   data: createBlogDto
    // });
    // const newBlog = await this.blogRepository.create(createBlogDto);
    const newBlog = await this.prismaService.blog.create({
      data: { content: createBlogDto.content, userId }
    });
    return newBlog;
  }

  async findByIdOrThrow(id: string): Promise<Blog> {
    const blog = await this.prismaService.blog.findUnique({ where: { id } });
    if (!blog)
      throw new EntityNotFoundException(
        'Blog entity with requested id is not found'
      );
    return blog;
  }

  async update(content: string, blogId: string) {
    // find blog by blogId
    // if (!blog) setn response error
  }

  async delete(blogId: string) {
    throw new EntityNotFoundException('Muamua');
    // await this.findByIdOrThrow(blogId);
    // if (!blog) setn response error
  }
}

export class EntityNotFoundException extends Error {
  constructor(message: string) {
    super(message);
  }
}
