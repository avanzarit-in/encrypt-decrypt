import { app } from '../../../server';
import { Request, Response, NextFunction } from 'express';
import { RegistrationController } from '../../../application-layer/registration/RegistrationController';

const validatePin = (req: Request, res: Response, next: NextFunction) => {
  (app.getController(RegistrationController.name) as RegistrationController).validatePin(req, res, next);
};

export default validatePin;
