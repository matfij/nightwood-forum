import express from 'express';
import { RegisterRoutes } from './controllers/routes';
import { errorHandler } from './common/error-handler';

const app = express();

app.use(express.json());

RegisterRoutes(app);

app.use(errorHandler);

app.listen(13000, () => {
    console.log(`generator-service started`);
});
