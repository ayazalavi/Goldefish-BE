import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@/models/user.model';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    if (req.header('authorization')) {
      const Authorization = req.header('authorization').split('Bearer ')[1] || null;
      if (Authorization) {
        const secretKey: string = config.get('secretKey');
        const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
        const userId = verificationResponse._id;
        const findUser = await userModel.findById(userId);

        if (findUser) {
          req.user = findUser;
          next();
        } else {
          next(new HttpException(401, 'Wrong authentication token'));
        }
      } else {
        next(new HttpException(404, 'Authorization token missing'));
      }
    } else {
      next(new HttpException(401, 'Authorization header is needed'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
