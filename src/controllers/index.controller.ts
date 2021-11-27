import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json({ data: [], message: 'index' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
