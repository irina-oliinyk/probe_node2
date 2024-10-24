import { startServer } from './server.js';
import { initMongoDb } from './db/initMongoDB.js';

const bootstrap = async () => {
  await initMongoDb();
  startServer();
};

bootstrap();
