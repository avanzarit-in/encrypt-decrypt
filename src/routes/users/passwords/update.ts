import { app } from '../../../server';
import { Request, Response, NextFunction } from 'express';
import { PasswordController } from '../../../application-layer/Password/PasswordController';

const update = (req: Request, res: Response, next: NextFunction) => {
  app.getController(PasswordController.name).update(req, res, next);
};

export default update;
