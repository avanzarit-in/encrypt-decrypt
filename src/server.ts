import App from './app';
import './config/env';
import { createController, IController } from './application-layer/IController';
import { createService } from './application-layer/IService';
import { createRepository } from './infrastructure-layer/IReposiroty';
import { UserController } from './application-layer/user/UserController';
import { UserService } from './application-layer/user/UserService';
import { UserRepository } from './infrastructure-layer/UserRepository';
import CryptoUtils from './utils/CryptoUtils';


const controllersMap: Map<string, IController<any, any, any, any>> = new Map<string, IController<any, any, any, any>>();
controllersMap.set(UserController.name, createController(UserController, createService(UserService, createRepository(UserRepository) as UserRepository) as UserService));

export const app = new App(
  controllersMap,
  process.env.SERVER_PORT,
);

app.listen();

