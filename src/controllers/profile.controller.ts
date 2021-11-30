import { NextFunction, Request, Response } from 'express';
import { SignUpDTO } from '@/dtos/signup.dto';
import { user } from '@/interfaces/user.interface';
import userService from '@/services/profile.service';
import { Sign } from 'crypto';
import ProfileService from '@/services/profile.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { isEnum, isMongoId } from 'class-validator';

class ProfileController {
  public profileService = new ProfileService();

  public profile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const profileId = req.params.id;
      if (!profileId) return res.status(200).json({ data: req.user, message: 'user data' });
      const isMongoID = isMongoId(profileId);
      if(!isMongoID) throw new Error("This is not a valid id")
      let user = await this.profileService.findUserById(profileId);
      res.status(200).json({ data: user, message: 'user data' });
    } catch (error) {
      next(error);
    }
  };

  public updateProfile = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {   
      //const updateUserData: user = await this.profileService.updateUser(userId, userData);
      let newuser = await this.profileService.updateUser(req.user, req.body)
      res.status(200).json({ data: newuser, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

}

export default ProfileController;
