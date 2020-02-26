import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../application-layer/user/UserController';

const create = (req: Request, res: Response, next: NextFunction) => {
  app.getController(UserController.name).create(req, res, next);
};

export default create;
