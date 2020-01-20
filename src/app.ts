import express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import morgan from 'morgan';
import cors from 'cors';
import { IController } from './application-layer/IController';

class App {
  public app: express.Application;
  public port: string;
  public controllerMap: Map<string, IController<any, any, any, any>>;

  constructor(controllers: Map<string, IController<any, any, any, any>>, port: string) {
    this.app = express();
    this.port = port;
    this.controllerMap = controllers;

    this.initializeMiddlewares();
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  public getController(name: string): IController<any, any, any, any> {
    return this.controllerMap.get(name);
  }

  public listen() {
    this.app.listen(this.port, () => {
      // tslint:disable-next-line: no-console
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
