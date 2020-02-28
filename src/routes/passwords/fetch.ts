import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { PasswordController } from '../../application-layer/Password/PasswordController';

const fetch = (req: Request, res: Response, next: NextFunction) => {
  app.getController(PasswordController.name).fetch(req, res, next);
};

export default fetch;
