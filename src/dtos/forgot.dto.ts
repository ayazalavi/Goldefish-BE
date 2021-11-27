import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class ForgotDTO {
  @IsString()
  @IsNotEmpty()
  public email: string;
}
