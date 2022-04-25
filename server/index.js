import "app-module-path/cwd";
import express from "express";
import config from 'config';
import db from 'server/db';

import api from 'server/api';
import staticResources from 'server/middleware/static';

import log from "server/utils/log";

const { HOST, PORT } = config.get('server');
const isProduction = process.env.NODE_ENV === 'production';

db.connect().then(() => {
    const app = express();

    app.use('/api', api);

    if (isProduction) {
        app.use(staticResources);
    }

    app.listen(PORT, HOST, err => {
        if (err) {
            log.error(err);
            return;
        }
        log.info(`Server is listening on ${HOST}:${PORT}`);
    });
});





