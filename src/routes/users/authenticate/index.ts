import express from 'express';

import authenticate from './authenticate'

const routes = express.Router(({ mergeParams: true }));

routes.post('/', authenticate);


export default routes;
