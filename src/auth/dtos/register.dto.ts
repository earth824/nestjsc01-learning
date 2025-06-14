import { IsAlphanumeric, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsString()
  @MinLength(6)
  @IsAlphanumeric()
  password: string;
}
