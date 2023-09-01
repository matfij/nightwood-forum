import express from 'express';
import { DIFactory } from './common/di-factory';
import { logger } from './common/middlewares/logger';
import { errorHandler } from './common/middlewares/error-handler';

const app = express();
const di = new DIFactory();

app.use(express.json());
app.use(logger);

app.use(di.getGeneratorRouter().router);
app.use(di.getProjectsRouter().router);
app.use(di.getDataSyncRouter().router);

app.use(errorHandler);

export { app };
