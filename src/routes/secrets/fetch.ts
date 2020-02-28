import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { SecretController } from '../../application-layer/Secret/SecretController';

const fetch = (req: Request, res: Response, next: NextFunction) => {
  app.getController(SecretController.name).fetch(req, res, next);
};

export default fetch;
