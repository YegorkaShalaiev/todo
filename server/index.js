import "app-module-path/cwd";
import express from "express";
import config from 'config';
import api from './api';
import db from 'common/db';

const { HOST, PORT } = config.get('server');

db.connect().then(() => {
    const app = express();

    app.use('/api', api);

    app.listen(PORT, HOST, err => {
        if (err) {
            console.error(err);
            return;
        }
        console.info(`Server is listening on ${HOST}:${PORT}`);
    });
});





