import { NextFunction, Request, Response } from 'express';
import { SignUpDTO } from '@/dtos/signup.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { user } from '@/interfaces/user.interface';
import AuthService from '@services/auth.service';
import { LoginDTO } from '@/dtos/login.dto';
import { ForgotDTO } from '@/dtos/forgot.dto';
import { SocialDTO } from '@/dtos/social.dto';
import { VerifyDTO } from '@/dtos/verify.dto';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: SignUpDTO = req.body;
      const signUpUserData: user = await this.authService.signup(userData);
      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: VerifyDTO = req.params;
      const verified = await this.authService.verify(userData);
      res.status(201).json({ data: verified, message: 'verify' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginDTO = req.body;
      const { token, loggedInUser } = await this.authService.login(userData);
      res.status(200).json({ data: loggedInUser, message: 'login', token });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: user = req.user;
      const logOutUserData: user = await this.authService.logout(userData);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };

  public forgot = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: ForgotDTO = req.body;
      const email = await this.authService.forgot(userData);
      res.status(200).json({ data: email, message: 'forgot' });
    } catch (error) {
      next(error);
    }
  };

  public social = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: SocialDTO = req.body;
      const { token, socialUser } = await this.authService.social(userData);
      res.status(200).json({ data: socialUser, message: 'social' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
