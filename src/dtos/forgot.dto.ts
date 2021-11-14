import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ForgotDTO {
  @IsEmail()
  public email: string;
}
