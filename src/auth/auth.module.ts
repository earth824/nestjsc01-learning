import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '@/users/users.module';
import { BcryptService } from './providers/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BcryptService, { provide: 'KEY', useValue: 'TEST' }],
  exports: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    // JwtModule.register({signOptions: {}}),
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory(jwtConfiguration: ConfigType<typeof jwtConfig>) {
        return {
          secret: jwtConfiguration.accessSecret,
          signOptions: {
            expiresIn: jwtConfiguration.accessExpires
          }
        };
      }
      // inject: [ConfigService],
      // useFactory(configService: ConfigService) {
      //   return {
      //     secret: configService.get<string>('JWT_ACCESS_SECRET'),
      //     signOptions: {
      //       expiresIn: configService.get<string>('JWT_ACCESS_EXPIRES')
      //     }
      //   };
      // }
    })
  ]
})
export class AuthModule {}

// import jwt from 'jsonwebtoken';
// const token = jwt.sign(
//   { id: userInfo.id },
//   { alg: 'HS256', expiresIn: 3600, notBefore: new Date('2026-01-01') }
// );
