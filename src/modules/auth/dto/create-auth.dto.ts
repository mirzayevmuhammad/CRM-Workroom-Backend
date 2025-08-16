import { IsEmail, IsString } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  //   @IsStrongPassword()
  @IsString()
  password: string;
}
