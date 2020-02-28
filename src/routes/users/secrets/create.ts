import { app } from '../../../server';
import { Request, Response, NextFunction } from 'express';
import { SecretController } from '../../../application-layer/Secret/SecretController';

const create = (req: Request, res: Response, next: NextFunction) => {
  app.getController(SecretController.name).create(req, res, next);
};

export default create;
