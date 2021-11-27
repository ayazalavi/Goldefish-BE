import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { SignUpDTO } from '@/dtos/signup.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { user } from '@/interfaces/user.interface';
import userModel from '@/models/user.model';
import { isEmpty } from '@utils/util';
import { LoginDTO } from '@/dtos/login.dto';
import { ForgotDTO } from '@/dtos/forgot.dto';
import { SocialDTO } from '@/dtos/social.dto';
import { VerifyDTO } from '@/dtos/verify.dto';
import EmailService from './email.service';

class AuthService {
  public users = userModel;

  public async signup(userData: SignUpDTO): Promise<user> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: user = await this.users.findOne({ $or: [{ 'email': userData.email }, { 'username': userData.username }] });
    if (findUser) throw new HttpException(409, `Username or email already exists`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const verificationCode = await bcrypt.hash(userData.email+userData.username, 10);
    const createUserData: user = await this.users.create({ ...userData, password: hashedPassword,
      verificationCode
    });
   // EmailService.sendForgotEmail
    //send email with verification code
    return createUserData;
  }

  public async login(userData: LoginDTO): Promise<{ token: string; loggedInUser: user }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: user = await this.users.findOne(
      { $or: [{ 'email': userData.usernameEmail }, { 'username': userData.usernameEmail }] }, "-verificationCode").exec();
    if (!findUser) throw new HttpException(409, `Username/Email not found`);    
    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password is incorrect");
  //  if (!findUser.isEmailVerified) throw new HttpException(409, `Email not verified`);  
    findUser["password"] = "";
    const tokenData = this.createToken(findUser);
    return { token: tokenData, loggedInUser: findUser };
  }

  public async logout(userData: user): Promise<user> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: user = await this.users.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `You're email ${userData.email} not found`);
    return findUser;
  }

  public async forgot(userData: ForgotDTO): Promise<boolean> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: user = await this.users.findOne({ $or: [{ 'email': userData.email }, { 'username': userData.email }] }).exec();
    if (!findUser) throw new HttpException(409, `${userData.email} is not signed up`);
    const password = (userData.email + (new Date()).getTime()).replace(/[^A-z0-9]/g, '').toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);    
    findUser.password = hashedPassword;
    findUser.save();
    await EmailService.sendForgotEmail(findUser, password);
    return true;
  }

  public async verify(userData: VerifyDTO): Promise<boolean> {
    console.log(userData)
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: user = await this.users.findOneAndUpdate({ 'verificationCode': userData.token}, 
    {"isEmailVerified" : true}).exec();
    if (!findUser) throw new HttpException(409, `Incorrect request data sent`);
    else if (findUser.isEmailVerified) throw new HttpException(409, `Email already verified`);
    return true;
  }

  public async social(userData: SocialDTO): Promise<{ token: string; socialUser: user }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    var socialMediaMap = new Map();
    socialMediaMap.set(userData.type, userData.id);
    if (userData.email !== '') {
      var findUser: user = await this.users.findOne({ email: userData.email });
      if (findUser) {
        findUser.socialMediaHandles = socialMediaMap;
      }
    }
    else {
      const key = `{ 'socialMediaHandles.${userData.type}': '${userData.id}'`;
      findUser = await this.users.findOne(JSON.parse(key));
    }
    if (!findUser) {
      findUser = await this.users.create({ email: userData.email, username: userData.username,
      phone: userData.phone, socialMediaHandles: socialMediaMap});
    }
    //post to social media
    const tokenData = this.createToken(findUser);
    return { token: tokenData, socialUser: findUser };
  }

  public createToken(user: user): string {
    const dataStoredInToken: DataStoredInToken = { _id: user._id };
    const secretKey: string = config.get('secretKey');
    return jwt.sign(dataStoredInToken, secretKey);
  }

}

export default AuthService;
