import express from 'express';

import checkRegistration from './checkregistration';

const routes = express.Router(({ mergeParams: true }));

routes.post('/', checkRegistration);


export default routes;
