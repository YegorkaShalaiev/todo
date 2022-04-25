import { Schema, model } from 'mongoose';

const schema = new Schema({
    type: String,
    text: String,
    date: {type: Date, default: Date.now},
    isDone: {type: Boolean, default: false},
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    }
});

export default model('Todo', schema);

