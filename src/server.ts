import 'reflect-metadata';
import App from './app';
import './config/env';
import { createController, IController } from './application-layer/IController';
import { createService } from './application-layer/IService';
import { createRepository } from './infrastructure-layer/IReposiroty';
import { UserController } from './application-layer/user/UserController';
import { UserService } from './application-layer/user/UserService';
import { UserRepository } from './infrastructure-layer/UserRepository';

import { SecretController } from './application-layer/secret/SecretController';
import { SecretService } from './application-layer/secret/SecretService';
import { SecretRepository } from './infrastructure-layer/SecretRepository';

import { PasswordController } from './application-layer/password/PasswordController';
import { PasswordService } from './application-layer/password/PasswordService';
import { PasswordRepository } from './infrastructure-layer/PasswordRepository';

const controllersMap: Map<string, IController<any, any, any, any>> = new Map<string, IController<any, any, any, any>>();
controllersMap.set(UserController.name, createController(UserController, createService(UserService, createRepository(UserRepository) as UserRepository) as UserService));
controllersMap.set(SecretController.name, createController(SecretController, createService(SecretService, createRepository(SecretRepository) as SecretRepository) as SecretService));
controllersMap.set(PasswordController.name, createController(PasswordController, createService(PasswordService, createRepository(PasswordRepository) as PasswordRepository) as PasswordService));


export const app = new App(
  controllersMap,
  process.env.SERVER_PORT,
);

app.listen();

