import 'reflect-metadata';
import App from './app';
import './config/env';
import { createController, IController } from './application-layer/IController';
import { createService } from './application-layer/IService';
import { createRepository } from './infrastructure-layer/IReposiroty';

import { UserController } from './application-layer/user/UserController';
import { UserService } from './application-layer/user/UserService';
import { UserRepository } from './infrastructure-layer/UserRepository';
import { SecretRepository } from './infrastructure-layer/SecretRepository';
import { SecretController } from './application-layer/Secret/SecretController';
import {SecretService} from './application-layer/secret/SecretService';
import { RegistrationController } from './application-layer/registration/RegistrationController';
import { RegistrationService } from './application-layer/registration/RegistrationService';

const controllersMap: Map<string, IController<any, any, any, any>> = new Map<string, IController<any, any, any, any>>();
controllersMap.set(UserController.name, createController(UserController, createService(UserService, createRepository(UserRepository) as UserRepository) as UserService));
controllersMap.set(SecretController.name, createController(SecretController, createService(SecretService, createRepository(SecretRepository) as SecretRepository) as SecretService));
controllersMap.set(RegistrationController.name, createController(RegistrationController, createService(RegistrationService, createRepository(UserRepository) as UserRepository) as RegistrationService));

export const app = new App(
  controllersMap,
  process.env.SERVER_PORT,
);

app.listen();

