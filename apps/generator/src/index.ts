import express from 'express';
import { RegisterRoutes } from './controllers/routes';
import { errorHandler } from './common/error-handler';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

RegisterRoutes(app);

app.use(errorHandler);

function connectDb() {
    mongoose.connect(process.env.DB_CONNECTION_STRING || '').then(() => console.log('generator-db connected'));
}

app.listen(13000, () => {
    connectDb();
    console.log('generator-app started');
});
