import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class SocialDTO {
  @IsString()
  @IsNotEmpty()
  public type: string;

  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public token: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public username: string;
  
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  public phone: string;
}
