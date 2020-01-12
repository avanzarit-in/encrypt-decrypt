import express from "express";
import{Request,Response} from "express";
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/error.handler';
import routes from './routes';
import swaggerJSDoc from 'swagger-jsdoc';
import  morgan from 'morgan';
import  cors from 'cors';
const app = express();

// swagger definition
let swaggerDefinition = {
    info: {
      title: 'CRM Service API',
      version: '1.0.0',
      description: 'CRM RESTful API Documentation',
    },
    host: 'localhost:3001',
    basePath: '/',
  };
  
  // options for the swagger docs
  let options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: [
    './routes/index.js',
    './routes/accounts/index.js',
    './domain-layer/account/account.js',
     './domain-layer/account/accountCreateRequest.js',
    './domain-layer/department/department.js',
    './domain-layer/group/group.js',
    './domain-layer/role/role.js',
    './domain-layer/user/user.js',
    ],
  };
  
  // initialize swagger-jsdoc
  let swaggerSpec = swaggerJSDoc(options);

  
app.use(cors());
app.use(morgan('dev', {
    skip: function (req:Request, res:Response) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req:Request, res:Response) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, './../public')));

app.use('/', routes);

// serve swagger
app.get('/swagger.json', function(req:Request, res:Response) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });


app.use(errorHandler);

const envType = (process.env.NODE_ENV || 'development');

require('dotenv').config({path: './config/env/' + envType + '.js'});

app.listen(process.env.SERVER_PORT, () => {
    console.log("Up and Running! -- This is our User Microservice at " + process.env.SERVER_PORT);
})

