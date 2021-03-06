import express from 'express';
import validatepin from './validatepin';

const routes = express.Router(({ mergeParams: true }));

routes.post('/', validatepin);

export default routes;
