// routes/reviewRoutes.js
import express from 'express';

const router = express.Router();

router.post('/check', (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Resume Reviewer API is healthy",
        time: new Date().toISOString(),
    });
});

export default router;
