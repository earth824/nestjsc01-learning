import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return { id: request.user?.sub, name: request.user?.name }; // { sub:string;name:string }
  }
);
// (@CurrentUser() user: any)
