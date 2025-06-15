import { IsString, IsUUID } from 'class-validator';

export class CurrentUserDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
