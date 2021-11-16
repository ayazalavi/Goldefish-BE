import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class VerifyDTO {
  @IsString()
  @IsNotEmpty()
  public token: string;
}
