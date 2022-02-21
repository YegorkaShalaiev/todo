import { Schema, model } from 'mongoose';

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    settings: {
        language: String,
        useDarkTheme: { type: Boolean, default: false }
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'List'
    }],
    refreshToken: String
});

export default model('User', schema);