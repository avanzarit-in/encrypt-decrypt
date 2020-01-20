import express from 'express';
import basic from './basic';

const routes = express.Router();

routes.use('/basic', basic);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
