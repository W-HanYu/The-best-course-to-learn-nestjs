import { IsNotEmpty, Length } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  @Length(1, 30)
  username: string;

  @IsNotEmpty()
  @Length(1, 30)
  password: string;
}
