import "app-module-path/cwd";
import express from "express";
import config from 'config';
import api from './api';
import db from 'backend/db';

import log from "backend/utils/log";

const { HOST, PORT } = config.get('server');

db.connect().then(() => {
    const app = express();

    app.use('/api', api);

    app.listen(PORT, HOST, err => {
        if (err) {
            log.error(err);
            return;
        }
        log.info(`Server is listening on ${HOST}:${PORT}`);
    });
});





