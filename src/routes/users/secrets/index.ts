import express from 'express';

import create from './create';
import del from './remove';
import fetch from './fetch';
import update from './update';

const routes = express.Router(({ mergeParams: true }));

routes.post('/', create);

routes.get('/', fetch);

routes.delete('/', del);

routes.put('/', update);

export default routes;
