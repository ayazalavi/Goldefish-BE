import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SocialDTO {
  @IsString()
  @IsNotEmpty()
  public type: string;

  @IsString()
  @IsNotEmpty()
  public id: string;
}
