import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { PasswordController } from '../../application-layer/Password/PasswordController';

const create = (req: Request, res: Response, next: NextFunction) => {
  app.getController(PasswordController.name).create(req, res, next);
};

export default create;
