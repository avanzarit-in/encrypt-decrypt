import express from 'express';
import users from './users';
import passwords from './passwords';
import secrets from './secrets';

const routes = express.Router();

routes.use('/users', users);
routes.use('/passwords', passwords);
routes.use('/secrets', secrets);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

export default routes;
