import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { BasicController } from '../../application-layer/basic/BasicController';

const list = (req: Request, res: Response, next: NextFunction) => {
  app.getController(BasicController.name).list(req, res, next);
};

export default list;
