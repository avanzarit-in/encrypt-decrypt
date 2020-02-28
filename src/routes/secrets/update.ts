import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { SecretController } from '../../application-layer/Secret/SecretController';

const update = (req: Request, res: Response, next: NextFunction) => {
  app.getController(SecretController.name).update(req, res, next);
};

export default update;
