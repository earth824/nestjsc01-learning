import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CustomResponseFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log('Global filter');
    const response = host.switchToHttp().getResponse<Response>();
    const result: Record<string, any> = {
      success: false,
      time: new Date(),
      statusCode: 500
    };
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      console.log(statusCode);
      result.statusCode = statusCode;
      result.message = exception.message;
    }
    response.status((result.statusCode as number) ?? 500).json(result);
  }
}
