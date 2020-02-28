import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { SecretController } from '../../application-layer/Secret/SecretController';

const remove = (req: Request, res: Response, next: NextFunction) => {
  app.getController(SecretController.name).delete(req, res, next);
};

export default remove;
