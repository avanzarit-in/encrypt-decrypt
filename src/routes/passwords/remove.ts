import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../application-layer/user/UserController';

const remove = (req: Request, res: Response, next: NextFunction) => {
  app.getController(UserController.name).delete(req, res, next);
};

export default remove;
