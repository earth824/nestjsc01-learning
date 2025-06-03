import { CreateBlogDto } from '@/blog/dtos/create-blog.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
