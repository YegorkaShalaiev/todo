import mongoose from 'mongoose';
import config from "config";
const { CONNECTION_STRING } = config.get('db');

export default {
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },

    async connect() {
        mongoose.connection.on("connected", () => console.info("DB successfully connected..."));
        mongoose.connection.on("disconnected", () => console.info("DB disconnected..."));
        mongoose.connection.on( "error", e => console.error('DB connection error: ', e));

        await mongoose.connect(CONNECTION_STRING, this.options);
    }
}