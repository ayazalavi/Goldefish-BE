import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { SignUpDTO } from '@/dtos/signup.dto';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { ForgotDTO } from '@/dtos/forgot.dto';
import { LoginDTO } from '@/dtos/login.dto';
import { SocialDTO } from '@/dtos/social.dto';
import { VerifyDTO } from '@/dtos/verify.dto';

class AuthRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validationMiddleware(SignUpDTO, 'body'), this.authController.signUp);
    this.router.post(`${this.path}signin`, validationMiddleware(LoginDTO, 'body'), this.authController.logIn);
    this.router.post(`${this.path}forgot`, validationMiddleware(ForgotDTO, 'body'), this.authController.forgot);
    this.router.post(`${this.path}social`, validationMiddleware(SocialDTO, 'body'), this.authController.social);
    this.router.get(`${this.path}logout`, authMiddleware, this.authController.logOut);
    this.router.get(`${this.path}verify/code:token`, validationMiddleware(VerifyDTO, 'params'), this.authController.verify);
  }
}

export default AuthRoute;
