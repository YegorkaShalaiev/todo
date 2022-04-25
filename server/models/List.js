import { Schema, model } from 'mongoose';

const schema = new Schema({
    type: String,
    title: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});

export default model('List', schema);