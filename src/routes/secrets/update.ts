import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../application-layer/user/UserController';

const update = (req: Request, res: Response, next: NextFunction) => {
  app.getController(UserController.name).update(req, res, next);
};

export default update;
