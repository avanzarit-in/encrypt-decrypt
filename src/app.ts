import express from 'express';
import 'reflect-metadata';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import morgan from 'morgan';
import cors from 'cors';
import { IController } from './application-layer/IController';
import { createConnection } from 'typeorm';

import routes from './routes';

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
    this.app.use('/', routes);
  }

  public getController(name: string): IController<any, any, any, any> {
    return this.controllerMap.get(name);
  }

  public listen() {
  

      createConnection({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        synchronize: true,
        logging: true,
        entities: [
          __dirname +'/infrastructure-layer/models/**/*.ts',
        ],
        migrations: [
          __dirname +'/infrastructure-layer/migration/**/*.ts',
        ],
        subscribers: [
          __dirname +'/infrastructure-layer/subscriber/**/*.ts',
        ],
        cli: {
          entitiesDir: 'infrastructure-layer/models',
          migrationsDir: 'infrastructure-layer/migration',
          subscribersDir: 'infrastructure-layer/subscriber',
        },
      }).then(async (connection) => {
        
        console.log('Connection setup successfully.');
          this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
        });
      }).catch((error) => console.log(error));
   
  }
}

export default App;
