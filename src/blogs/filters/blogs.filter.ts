import { EntityNotFoundException } from '@/blog/blog.service';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException
} from '@nestjs/common';
import { Response } from 'express';

// @Catch(EntityNotFoundException)
// export class BlogsFilter implements ExceptionFilter {
//   catch(exception: EntityNotFoundException, host: ArgumentsHost) {
//     console.log('Filtere execute');
//     const response = host.switchToHttp().getResponse<Response>();
//     response.status(400).json({ message: exception.message });
//   }
// }

@Catch(UnauthorizedException)
export class BlogsFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundException, host: ArgumentsHost) {
    console.log('Filtere execute');
    const response = host.switchToHttp().getResponse<Response>();
    // if (cond) response.status(401).json({ message: 'Unauthorized' });
    throw exception;
  }
}
