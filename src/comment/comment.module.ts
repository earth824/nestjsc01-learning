import { BlogModule } from '@/blog/blog.module';

import { CommentController } from '@/comment/comment.controller';
import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';

@Module({
  imports: [BlogModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
