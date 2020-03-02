import { app } from '../../../server';
import { Request, Response, NextFunction } from 'express';
import { RegistrationController } from '../../../application-layer/registration/RegistrationController';

const validate = (req: Request, res: Response, next: NextFunction) => {
  (app.getController(RegistrationController.name) as RegistrationController).validate(req, res, next);
};

export default validate;
