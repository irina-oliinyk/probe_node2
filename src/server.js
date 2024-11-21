import express from 'express';

import router from './routes/index.js';
import cors from 'cors';
import { env } from './utils/env.js';
// import studentsRouter from './routes/students.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { loger } from './middlewares/loger.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();
  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '100kb',
    }),
  );
  app.use(cors());

  app.use(cookieParser());

  app.use(loger);

  // app.use('/students', studentsRouter); // + дописать адрес в начале и в функции удалить его(в файле роутер/студентс.js) додаємо роутер до app як middleware

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `);
  });
};

// app.use('*', (req, res, next) => {
//   res.status(404).json({
//     message: 'Not Found',
//   });
// });

// app.use((err, req, res, next) => {
//   res.status(500).json({
//     message: 'Something went wrong',
//     error: err.message,
//   });
// });
