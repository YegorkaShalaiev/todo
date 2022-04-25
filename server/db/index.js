import mongoose from 'mongoose';
import config from "config";
import log from 'server/utils/log';

const { CONNECTION_STRING } = config.get('db');

export default {
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },

    async connect() {
        mongoose.connection.on("connected", () => log.info("DB successfully connected..."));
        mongoose.connection.on("disconnected", () => log.info("DB disconnected..."));
        mongoose.connection.on( "error", e => log.error('DB connection error: ', e));

        await mongoose.connect(CONNECTION_STRING, this.options);
    }
}