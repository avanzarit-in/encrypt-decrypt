import { app } from '../../../server';
import { Request, Response, NextFunction } from 'express';
import { SecretController } from '../../../application-layer/Secret/SecretController';

const checkRegistration = (req: Request, res: Response, next: NextFunction) => {
  (app.getController(SecretController.name) as SecretController).authenticate(req, res, next);
};

export default checkRegistration;
