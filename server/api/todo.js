import express from "express";

const router = express.Router();

router.get('/', async (req, res) => {
    res.send('GET');
});

router.post('/', async (req, res) => {
    res.send('POST');
});

export default router;
