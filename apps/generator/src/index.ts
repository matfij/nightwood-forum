import os from 'os';
import cluster from 'cluster';
import express from 'express';
import mongoose from 'mongoose';
import { APP_MAX_FORKS, APP_PORT, DB_CONNECTION_STRING } from './common/config';
import { DIFactory } from './common/di-factory';
import { logger } from './common/middlewares/logger';

const app = express();
const di = new DIFactory();

app.use(express.json());
app.use(logger);
app.use(di.getGeneratorRouter().router);
app.use(di.getProjectsRouter().router);
app.use(di.getDataSyncRouter().router);

function connectDb() {
    mongoose.connect(DB_CONNECTION_STRING).then(() => console.log(`generator-db connected (pid: ${process.pid})`));
}

if (cluster.isPrimary) {
    for (let i = 0; i < Math.min(os.cpus().length, APP_MAX_FORKS); i++) {
        cluster.fork(process.env);
    }
} else {
    app.listen(APP_PORT, () => {
        connectDb();
        console.log(`generator-app started (p1d: ${process.pid}).`);
    });
}
