import express from 'express';

import create from './create';
import del from './remove';
import list from './list';
import fetch from './fetch';
import update from './update';

const routes = express.Router(({ mergeParams: true }));

routes.post('/', create);

routes.get('/', fetch);

//routes.get('/:id', fetch);

routes.delete('/:id', del);

routes.put('/:id', update);

export default routes;
