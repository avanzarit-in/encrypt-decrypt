import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { UserController } from '../../application-layer/user/UserController';

const fetch = (req: Request, res: Response, next: NextFunction) => {
  app.getController(UserController.name).fetch(req, res, next);
};

export default fetch;
