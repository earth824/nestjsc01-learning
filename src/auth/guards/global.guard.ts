import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context.getClass());
    console.log(context.getHandler());
    // const result = this.reflector.get<string>('TEST', context.getHandler());
    const result = this.reflector.getAll<(boolean | undefined)[]>('PUBLIC', [
      context.getHandler(), // undefined
      context.getClass() // false
    ]);
    console.log('result: ', result);

    // const request = context.switchToHttp().getRequest<Request>();

    return true;
  }
}
