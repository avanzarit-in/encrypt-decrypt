import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { PasswordController } from '../../application-layer/Password/PasswordController';

const remove = (req: Request, res: Response, next: NextFunction) => {
  app.getController(PasswordController.name).delete(req, res, next);
};

export default remove;
