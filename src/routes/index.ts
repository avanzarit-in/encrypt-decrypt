import express from 'express';
import users from './users';
import secrets from './users/secrets';

const routes = express.Router();

routes.use('/users', users);
routes.use('/secrets', secrets);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

export default routes;
