import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { BasicController } from '../../application-layer/basic/BasicController';

const remove = (req: Request, res: Response, next: NextFunction) => {
  app.getController(BasicController.name).delete(req, res, next);
};

export default remove;
