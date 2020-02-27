import express from 'express';

import create from './create';
import del from './remove';
import list from './list';
import fetch from './fetch';
import update from './update';

const routes = express.Router(({ mergeParams: true }));

routes.post('/', create);

routes.get('/', list);

routes.get('/:nuid', fetch);

routes.delete('/:nuid', del);

routes.put('/:nuid', update);

export default routes;
