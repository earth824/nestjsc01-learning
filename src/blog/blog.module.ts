import { BlogController } from '@/blog/blog.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [BlogController],
  exports: [],
  providers: []
}) // static module
export class BlogModule {}

// dynamic module
// @Module({})
// export class DynamicBlogModule {
//   static forRoot({ token }: { token: string }): DynamicModule {
//     return {
//       module: DynamicBlogModule,
//       imports: [],
//       controllers: [],
//       exports: [],
//       providers: []
//     };
//   }

//   static forFeature({}) {}

//   static register({}) {}

//   static registerAsync({}) {}
// }
