import express from 'express';

import validate from './validate';

const routes = express.Router(({ mergeParams: true }));

routes.post('/', validate);


export default routes;
