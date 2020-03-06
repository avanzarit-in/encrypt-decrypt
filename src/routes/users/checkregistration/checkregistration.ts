import { app } from '../../../server';
import { Request, Response, NextFunction } from 'express';
import { RegistrationController } from '../../../application-layer/registration/RegistrationController';

const checkRegistration = (req: Request, res: Response, next: NextFunction) => {
  (app.getController(RegistrationController.name) as RegistrationController).checkRegistration(req, res, next);
};

export default checkRegistration;
