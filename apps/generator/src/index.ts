import os from 'os';
import cluster from 'cluster';
import express from 'express';
import mongoose from 'mongoose';
import { RegisterRoutes } from './controllers/routes';
import { errorHandler } from './common/error-handler';
import { DB_CONNECTION_STRING } from './common/config';

const app = express();

app.use(express.json());

RegisterRoutes(app);

app.use(errorHandler);

function connectDb() {
    mongoose.connect(DB_CONNECTION_STRING).then(() => console.log(`generator-db connected (pid: ${process.pid})`));
}

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork(process.env);
    }
} else {
    app.listen(13000, () => {
        connectDb();
        console.log(`generator-app started (pid: ${process.pid})`);
    });
}
