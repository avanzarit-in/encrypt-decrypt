import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { SecretController } from '../../application-layer/Secret/SecretController';

const list = (req: Request, res: Response, next: NextFunction) => {
  app.getController(SecretController.name).list(req, res, next);
};

export default list;
