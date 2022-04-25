import express from 'express';
import path from "path";

const router = express.Router();

router.use(express.static(path.join(process.cwd(), 'client', 'dist')));

router.get('*', async (req, res) => {
    await res.sendFile(path.resolve(process.cwd(), 'client', 'dist', 'index.html'));
});

export default router;