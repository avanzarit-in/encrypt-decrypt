import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { PasswordController } from '../../application-layer/Password/PasswordController';

const list = (req: Request, res: Response, next: NextFunction) => {
  app.getController(PasswordController.name).list(req, res, next);
};

export default list;
