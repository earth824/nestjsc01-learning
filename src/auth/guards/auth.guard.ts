import { IS_PUBLIC } from '@/common/decorators/public.decorator';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  //
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log('Auth Guard executed');
    // console.log(context.getType());
    // console.log(context.getArgs()[0]);
    // console.log(context.getClass());
    // console.log(context.getHandler());
    // console.log(context.switchToHttp());
    const isPublic = this.reflector.getAllAndOverride<boolean | undefined>(
      IS_PUBLIC,
      [context.getHandler(), context.getClass()]
    );

    // const roles = this.reflector.getAllAndOverride<string[]>('ROLE', [
    //   context.getHandler(),
    //   context.getClass()
    // ]);

    // const role = request.user.role as string;
    // if (roles.includes(role)) {
    //   return true;
    // }
    // throw new ForbiddenException('no permission');

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>(); // function(req,res,next)
    // Authorization: Bearer JWT

    const authorization = request.headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('Invalid authorization header');
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException('Invalid authorization header');

    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        name: string;
        // role: 'admin' | 'user';
      }>(token);
      request.user = payload;

      // request['user'] = payload; // { sub: string; name:string }

      // const result = request['user'] as { sub: string; name: string };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid JWT');
    }

    // return true;
  }
}

// interface Request {
//   user?: { sub: string; name: string }
// }

// interface A {
//    name: string;
//    age: number;
// }
