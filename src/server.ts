import App from './app';
import './config/env';
import { createController, IController } from './application-layer/IController';
import { createService } from './application-layer/IService';
import { createRepository } from './infrastructure-layer/IReposiroty';
import { BasicController } from './application-layer/basic/BasicController';
import { BasicService } from './application-layer/basic/BasicService';
import { BasicRepository } from './infrastructure-layer/BasicRepository';

const controllersMap: Map<string, IController<any, any, any, any>> = new Map<string, IController<any, any, any, any>>();
controllersMap.set(BasicController.name, createController(BasicController, createService(BasicService, createRepository(BasicRepository) as BasicRepository) as BasicService));

export const app = new App(
  controllersMap,
  process.env.SERVER_PORT,
);

app.listen();
