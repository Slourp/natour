/* eslint-disable import/extensions */
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { usersRoutes, natourRoutes } from './app/routes/index.js';

/**
 * Connected to the Mango Database
 */
connectDB();

/**
 * Lanch the app
 */
const app = express();

/**
 * Server Setup Middlewares
 */
app
  .use(
    json({
      extended: true,
      verify: (_req, res, buf, _encoding) => {
        try {
          JSON.parse(buf);
        } catch (e) {
          res.status(404).json({ status: 'ko', message: 'invalid JSON' });
          throw Error('invalid JSON');
        }
      },
    })
  )

  .use(urlencoded({ extended: true }))
  .use(cors());

if (process.env.NODE_ENV) app.use(morgan('dev'));
/**
 * Routes
 */

app.use('/api/v1/users/', usersRoutes);

app.use('/api/v1/tours/', natourRoutes);

app.use('/', (_req, res) => {
  return res.status(200).json({ message: 'ok' });
});

export default app;
