import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  public usernameEmail: string;

  @IsString()
  @IsNotEmpty()
  public password: string;
}
