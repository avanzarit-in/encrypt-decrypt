import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../application-layer/user/UserController';

const list = (req: Request, res: Response, next: NextFunction) => {
  app.getController(UserController.name).list(req, res, next);
};

export default list;
