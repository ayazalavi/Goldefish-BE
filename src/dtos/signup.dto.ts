import { IsAlphanumeric, IsEmail, IsPhoneNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDTO {
  @IsEmail()
  public email: string;

  @IsPhoneNumber()
  public phone: string;

  @MinLength(4, {
    message: 'Username should be atleast 4 characters',
  })
  @MaxLength(20, {
    message: 'Password should be less than 20 characters in length',
  })
  @IsString()
  public username: string;

  @MinLength(6, {
    message: 'Password should be atleast 6 characters',
  })
  @MaxLength(30, {
    message: 'Password should be less than 30 characters in length',
  }) 
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    { message: 'Password should be atleast 8 characters in length and should contain at least one digit, one lower case, one upper case' })
  public password: string;
}
