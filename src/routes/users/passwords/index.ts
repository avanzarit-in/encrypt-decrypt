import express from 'express';

import create from './create';
import del from './remove';
import list from './list';
import fetch from './fetch';
import update from './update';

const routes = express.Router(({ mergeParams: true }));

routes.post('/:passgrp', create);

routes.get('/', list);

//routes.get('/:passgrp', list);

routes.get('/:passgrp', fetch);

routes.delete('/:passgrp', del);

routes.put('/:passgrp', update);

export default routes;
