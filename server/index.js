import "app-module-path/cwd";
import express from "express";
import cors from 'cors';
import config from 'config';
import db from 'server/db';

import api from 'server/api';
import staticResources from 'server/middleware/static';

import log from "server/utils/log";

const { HOST, PORT } = config.get('server');
const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

const app = express();

export async function start(dbOpts) {
    await db.connect(dbOpts);

    app.use(cors());
    app.use('/api', api);

    isProduction && app.use(staticResources);

    app.listen(PORT, HOST, err => {
        if (err) {
            log.error(err);
            return;
        }
        log.info(`${isTest ? 'Test server' : 'Server'} is listening on ${HOST}:${PORT}`);
    });
}

!isTest && start();

export default app;





