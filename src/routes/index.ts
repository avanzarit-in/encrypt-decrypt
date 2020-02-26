import express from 'express';
import user from './user';

const routes = express.Router();

routes.use('/user', user);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

export default routes;
