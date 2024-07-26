import express from 'express';
// import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import env from './utils/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

// dotenv.config();

const app = express();

const PORT = Number(env('PORT', '3000'));

export default function setupServer() {
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.use(express.json());

  app.use('/uploads', express.static(UPLOAD_DIR));
  
  app.use(cookieParser());

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
