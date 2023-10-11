import express, { Application } from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';

export const app: Application = express();
//cors
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Rate limit
const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: 'too many requests sent by this ip, please try again in 15 minute !',
});
//All Routes
app.use('/api/v1', routes);
app.use(limiter);
//Global Error Handler
app.use(globalErrorHandler);

//handle not found
app.use(NotFoundHandler.handle);
