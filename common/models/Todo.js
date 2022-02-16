import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    title: String,
    text: String,
    date: {type: Date, default: Date.now},
    isDone: {type: Boolean, default: false}
});

export default model('Todo', todoSchema);

