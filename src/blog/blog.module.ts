import { BlogController } from '@/blog/blog.controller';
import { Blogservice } from '@/blog/blog.service';
import { TestProvider } from '@/blog/providers/test.provider';

import { Module } from '@nestjs/common';
import { BlogRepository } from './blog.repository';

const CONFIG = '500';

export interface IBlogRepository {
  create: (data: { content: string }) => Promise<{
    id: string;
    content: string;
    image: string | null;
    createdAt: Date;
  }>;
}

class MockBlockRepository implements IBlogRepository {
  async create(data: { content: string }) {
    return { id: '1', content: 'aaaa', image: null, createdAt: new Date() };
  }
}

@Module({
  imports: [],
  controllers: [BlogController],
  exports: [Blogservice],
  providers: [
    Blogservice,
    { provide: Blogservice, useClass: Blogservice },
    { provide: 'CFG', useValue: CONFIG },
    TestProvider,
    BlogRepository,
    { provide: 'BlogRepository', useClass: MockBlockRepository }
  ]
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
