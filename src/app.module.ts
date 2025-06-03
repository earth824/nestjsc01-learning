import { BlogModule } from '@/blog/blog.module';
import { CommentModule } from '@/comment/comment.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BlogModule, CommentModule, UsersModule]
})
export class AppModule {}
