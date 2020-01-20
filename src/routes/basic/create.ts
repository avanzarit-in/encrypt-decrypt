import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { BasicController } from '../../application-layer/basic/BasicController';

const create = (req: Request, res: Response, next: NextFunction) => {
  app.getController(BasicController.name).create(req, res, next);
};

export default create;
