import express from "express";
import Todo from 'common/models/Todo';

const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await Todo.find();

    res.send(todos);
});

router.post('/', async (req, res) => {
    const { title, text } = req.body;

    await Todo.create({title, text});

    res.status(201).send('');
});

export default router;
