import { LoginDto } from '@/auth/dtos/login.dto';
import { RegisterDto } from '@/auth/dtos/register.dto';
import { BcryptService } from '@/auth/providers/bcrypt.service';
import jwtConfig from '@/config/jwt.config';
import { UsersService } from '@/users/users.service';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    // private readonly configService: ConfigService
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject('KEY') private readonly keyProvider: string,
    private readonly jwtService: JwtService
  ) {
    // const port = this.configService.get<number>('PORT');
    // console.log(typeof port);
    const secret = this.jwtConfiguration.accessSecret;
    const expires = this.jwtConfiguration.accessExpires;

    console.log(typeof secret, typeof expires);
  }

  async register(registerDto: RegisterDto): Promise<void> {
    // Check exist user
    const existingUser = await this.usersService.findByName(registerDto.name);
    if (existingUser) throw new BadRequestException('Username already in use');

    // Hash a password
    // registerDto { name:string; password:string }
    registerDto.password = await this.bcryptService.hash(registerDto.password);

    // Store a new user into DB
    await this.usersService.create(registerDto);
  }

  async login(
    loginDto: LoginDto
  ): Promise<{ access_token: string; refresh_token: string }> {
    const user = await this.usersService.findByName(loginDto.name);
    if (!user) throw new BadRequestException('Invalid credentials');

    const isMatch = await this.bcryptService.compare(
      loginDto.password,
      user.password
    );

    if (!isMatch) throw new BadRequestException('Invalid credentials');

    const access_token = await this.jwtService.signAsync({
      sub: user.id,
      name: user.name
    });

    const refresh_token = await this.jwtService.signAsync(
      {
        sub: user.id
      },
      {
        secret: this.jwtConfiguration.refreshSecret,
        expiresIn: this.jwtConfiguration.refreshExpires
      }
    );

    return { access_token, refresh_token };
  }
}
