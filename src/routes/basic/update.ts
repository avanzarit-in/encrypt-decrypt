import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { BasicController } from '../../application-layer/basic/BasicController';

const update = (req: Request, res: Response, next: NextFunction) => {
  app.getController(BasicController.name).update(req, res, next);
};

export default update;
