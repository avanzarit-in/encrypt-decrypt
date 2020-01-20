import { app } from '../../server';
import { Request, Response, NextFunction } from 'express';
import { BasicController } from '../../application-layer/basic/BasicController';

const fetch = (req: Request, res: Response, next: NextFunction) => {
  app.getController(BasicController.name).fetch(req, res, next);
};

export default fetch;
