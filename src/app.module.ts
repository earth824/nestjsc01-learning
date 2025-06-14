import { BlogModule } from '@/blog/blog.module';
import { CommentModule } from '@/comment/comment.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from '@/config/jwt.config';
import { validate } from '@/config/validate';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/guards/auth.guard';

@Module({
  imports: [
    BlogModule,
    CommentModule,
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // validationSchema: Joi.object({
      //   PORT: Joi.number().port(),
      //   DATABASE_URL: Joi.string().uri(),
      //   JWT_ACCESS_SECRET: Joi.string().min(32)
      // })
      validate,
      load: [jwtConfig]
    })
  ],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }]
})
export class AppModule {}
