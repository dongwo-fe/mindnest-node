import express from 'express';

import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

export default router;