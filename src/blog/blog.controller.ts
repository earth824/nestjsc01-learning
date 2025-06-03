import { CreateBlogDto } from '@/blog/dtos/create-blog.dto';
import { GetAllQueryDto } from '@/blog/dtos/get-all-query.dto';
import { UpdateBlogDto } from '@/blog/dtos/update-blog.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UnauthorizedException,
  ValidationPipe
} from '@nestjs/common';

@Controller('blogs')
export class BlogController {
  @Get() // GET /blogs
  getAll(@Query() query: GetAllQueryDto) {
    // { title?: string; page?: number; limit?: number; startDate?: Date; endDate?:Date }
    // SELECT * FROM blogs

    return 'GET /blogs: BlogController';
  }

  @Get('today') // GET /blogs/today
  getTodayBlog() {
    return 'GET /blogs/today';
  }

  @Get(':blogId/:commentId') // GET /blogs/:blogId ==> /blogs/67?title=hello == 67 is Path parameters,  title=hello is Query string, Request Body
  // getBlogById(@Param() params: any) {
  // getBlogById(@Param('blogId') b: string, @Param('commentId') cId: string) {
  getBlogById(@Param('commentId') cId: string, @Param('blogId') b: string) {
    // console.log(params);
    console.log(b);
    console.log(cId);
    return 'GET /blogs/:blogId';
  }
  // { success: true, data: 'GET /blogs/:blodata:gId'  } // { success: false, message: '', statusCode: 500 }

  @Post('comment{/:commentId}')
  // createComment(@Body() body: any) {
  createComment(@Body('user') user: any) {
    // console.log(body);
    console.log(user);
    return 'Create comment';
  }

  @Post() // POST /blogs
  create(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    body: CreateBlogDto
  ) {
    // { title: string, body: string, isPublish: boolean, expires: Date }
    console.log(body);
    console.log(body instanceof CreateBlogDto);
    return 'POST /blogs';
  }

  // @HttpCode(204)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login() {}

  @Put(':id')
  // update(@Param('id', ParseIntPipe) id: number) {
  update(
    // @Param(
    //   'id',
    //   new ParseIntPipe({
    //     errorHttpStatusCode: HttpStatus.FORBIDDEN,
    //     exceptionFactory() {
    //       // throw new BadRequestException(
    //       //   'Invalid blog id(id must be an integr)'
    //       // );
    //       throw new UnauthorizedException('Unauthorized id');
    //     }
    //   })
    // )
    // id: number,
    @Body()
    body: UpdateBlogDto
  ) {
    // console.log(id);
    // console.log(typeof id);
    return 'PUT /blogs';
  }

  @Delete() // DELETE /blogs
  delete() {
    return 'DELETE /blogs';
  }

  @Patch()
  updatePartial(
    @Query(
      'asc',
      new ParseBoolPipe({
        exceptionFactory() {
          throw new BadRequestException(
            'Asc must be one of following value: true, false'
          );
        }
      })
    )
    isAsc: boolean
  ) {
    console.log(isAsc);
    return isAsc;
  }
}

// Create Module comments, Create Controller comment, register CommentModule to AppModule, register CommentController to CommentModule
// CRUD comment   /comments
// GET /comments
// GET /comments/:id
// POST /comments
// PUT /comments/:id
// DELETE /comments/:id

// SOLID principle
// S (SRP) ==> single responsiblity principle
// O (OCP) ==> open-closed principle ==> OPEN for extension Close modification
// L (LSP) ==> Liskov substitution principle ===>
// I (ISP) ==> Interface segragation principle
// D (DIP) ==> Dependency Inversion principle

// class Person {}

// class User extends Person implements UserRepository{
//   findById(id: string) {
//     // SELECT * FROM users WHERE id = id
//     // prisma.user.findUnique({ where {id} })
//     // return user object
//   }
// }

// class PrismaUser implements UserRepository {
//   findById(id: string) {
//     // prisma.user.findUnique({ where {id} })
//     // return user object
//   }
// }

// interface UserRepository {
//   findById(id:string): void
// }

// // POST dependency with USER
// class Post {
//   constructor(private u: UserRepository)

//   create(userId: string, title: string) {
//     // insert data todabase
//     // const u = new User();

//     const foundUser = this.u.findById(userId);
//     if (!foundUser) {
//       throw new Error('Invalid user in DB');
//     }
//     // INSERT INTO post COLUMN (userId) VALUE (a)
//   }
// }

// // NestJS Ioc container
// // const u = new User();
// const prismaUser = new PrismaUSer()
// u.findById('a');
// const p = new Post(prismaUser);
// p.create();

// interface Flyable {
//   fly(): void;
// }

// interface Bird {
//   species: string;
// }

// class Parrot implements Bird, Flyable {
//   species: string = 'Parrot';
// }

// class Penguin implements Bird {
//   species = 'Penguin';
// }
