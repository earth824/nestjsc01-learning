import { Blogservice } from '@/blog/blog.service';
import { CreateCommentDto } from '@/comment/dtos/create-comment.dto';
import { GetAllQueryDto } from '@/comment/dtos/get-all-query.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query
} from '@nestjs/common';

@Controller('/comments')
export class CommentController {
  constructor(private readonly blogService: Blogservice) {}

  @Get() // Query { title?:string; page?: number; limit?: number }
  getAll(@Query() queryParams: GetAllQueryDto) {
    return '';
  }

  @Get(':id')
  getById() {}

  @Post() // Body { postId: number, title: string, email: string }
  create(@Body() createComment: CreateCommentDto) {}

  @Put(':id')
  update() {}

  @Delete(':id')
  delete() {}
}
