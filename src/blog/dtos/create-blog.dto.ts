// import { Type } from 'class-transformer';
// import {
//   IsBoolean,
//   IsDate,
//   IsEmail,
//   IsInt,
//   IsNotEmpty,
//   IsOptional,
//   IsString
// } from 'class-validator';

import { IsNotEmpty, IsString } from 'class-validator';

// export class CreateBlogDto {
//   @IsString()
//   @IsNotEmpty({ message: 'Title cannot be empty' })
//   title: string;

//   @IsOptional()
//   @IsString()
//   @IsNotEmpty()
//   body?: string;

//   @IsBoolean()
//   isPublish: boolean;

//   @Type(() => Date)
//   @IsDate({ message: 'Invalid date ISO8601 format for expires date' })
//   expires: Date;

//   @Type(() => Number)
//   @IsInt()
//   count: number;

//   @IsEmail({})
//   email: string;

//   @IsString()
//   user: string;
// }

// zod, joi
// const dto = new CreateBlogDto(); // instance of CreateBlogDto class

// { title: string, body: string, isPublish: boolean, expires: Date }
// plain JS object

// NEst validate and trnasform using class-validator and class-tramsformer
// Nest transform request body(plain object) into instance of a class (class-transformer)
// Nest validate instance of a class (class validator)
// check validaiton fail or success (if fail throw error) (if success pass to controller handle function)

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
