import { CommentController } from '@/comment/comment.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [CommentController]
})
export class CommentModule {}
