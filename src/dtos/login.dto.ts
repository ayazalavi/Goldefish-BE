import { IsEmail, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  public usernameEmail: string;

  @IsString()
  public password: string;
}
