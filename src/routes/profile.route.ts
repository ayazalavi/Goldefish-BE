import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ProfileController from '@/controllers/profile.controller';
import authMiddleware from '@middlewares/auth.middleware';

class ProfileRoute implements Routes {
  public path = '/profile';
  public router = Router();
  public profileController = new ProfileController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id?`, authMiddleware, this.profileController.profile);
    this.router.post(`${this.path}`, authMiddleware, this.profileController.updateProfile);    
  }
}

export default ProfileRoute;
