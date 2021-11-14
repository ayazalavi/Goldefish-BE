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

class AuthService {
  public users = userModel;

  public async signup(userData: SignUpDTO): Promise<user> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: user = await this.users.findOne({ $or: [{'email': userData.email}, {'username': userData.email}] });
    if (findUser) throw new HttpException(409, `Username or email already exists`);
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const createUserData: user = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async login(userData: LoginDTO): Promise<{ token: string; loggedInUser: user }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const findUser: user = await this.users.findOne({ $or: [{'email': userData.usernameEmail}, {'username': userData.usernameEmail}] });
    if (!findUser) throw new HttpException(409, `Username/Email not found`);
    const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, "You're password is incorrect");
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
    const findUser: user = await this.users.findOne({ 'email': userData.email});
    if (!findUser) throw new HttpException(409, `${userData.email} is not signed up`);
    // send email
    //const tokenData = this.sendEmail(findUser);
    return true;
  }

  public async social(userData: SocialDTO): Promise<{ token: string; socialUser: user }> {
    if (isEmpty(userData)) throw new HttpException(400, "You're not userData");
    const key = `{ 'socialMediaHandles.${userData.type}': '${userData.id}'`;
    const findUser: user = await this.users.findOne(JSON.parse(key));
    //if (!findUser) throw new HttpException(409, `Username/Email not found`);
    //const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
    //if (!isPasswordMatching) throw new HttpException(409, "You're password is incorrect");
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
