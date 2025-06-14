import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  //
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // console.log(context.getType());
    // console.log(context.getArgs()[0]);
    // console.log(context.getClass());
    // console.log(context.getHandler());
    // console.log(context.switchToHttp());
    const request = context.switchToHttp().getRequest<Request>(); // function(req,res,next)
    // Authorization: Bearer JWT

    if (request.path === '/auth/login') return true;

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
      }>(token);
      request.user = payload;

      // request['user'] = payload; // { sub: string; name:string }

      // const result = request['user'] as { sub: string; name: string };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid JWT');
    }
  }
}

// interface Request {
//   user?: { sub: string; name: string }
// }

// interface A {
//    name: string;
//    age: number;
// }
