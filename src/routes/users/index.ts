import express from 'express';

import create from './create';
import del from './remove';
import list from './list';
import fetch from './fetch';
import update from './update';

import secrets from './secrets';
import passwords from './passwords';
import checkRegistration from './checkregistration';
import validatepin from './validatepin';
import authenticate from './authenticate';

const routes = express.Router(({ mergeParams: true }));

routes.post('/', create);
routes.get('/', list);
routes.get('/:nuid', fetch);
routes.delete('/:nuid', del);
routes.put('/:nuid', update);

routes.use('/:nuid/secrets', secrets);
routes.use('/:nuid/passwords', passwords);
routes.use('/:nuid/checkregistration', checkRegistration);
routes.use('/:nuid/validatepin', validatepin);
routes.use('/:nuid/authenticate', authenticate);

export default routes;
