/* eslint-disable import/extensions */
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { usersRoutes, natourRoutes, googleDriveRoutes } from './app/routes/index.js';
import AppError from './app/models/AppError.js';
import { globalErrorHandler } from './app/controller/ErrorController.js';
import JsonCheckMiddleWare from './middlewares/JsonCheckMiddleware.js';
import helmet from 'helmet';

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
  .use(requestTimeMiddleware)
  .use(helmet())
  .use(JsonCheckMiddleWare)
  .use(urlencoded({ extended: true }))
  .use(cors());

app.disable('x-powered-by')

if (process.env.NODE_ENV) app.use(morgan('dev'));
/**
 * Routes
 */

app.use('/api/v1/users/', usersRoutes);

app.use('/api/v1/tours/', natourRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
