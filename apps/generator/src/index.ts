import os from 'os';
import cluster from 'cluster';
import mongoose from 'mongoose';
import { APP_MAX_FORKS, APP_PORT, DB_CONNECTION_STRING } from './common/config';
import { handleProcessError } from './common/errors/handle-process-error';
import { app } from './app';

if (cluster.isPrimary) {
    for (let i = 0; i < Math.min(os.cpus().length, APP_MAX_FORKS); i++) {
        const worker = cluster.fork(process.env);
        worker.on('exit', (code, signal) => {
            console.log(`Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`);
        });
    }
} else {
    app.listen(APP_PORT, () => {
        mongoose.connect(DB_CONNECTION_STRING).then(() => console.log(`generator-db connected (pid: ${process.pid})`));
        console.log(`generator-app started (p1d: ${process.pid}).`);
    });
    process.on('uncaughtException', (err) => {
        handleProcessError(err);
    });
}
