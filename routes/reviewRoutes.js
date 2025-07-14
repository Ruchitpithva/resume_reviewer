// routes/reviewRoutes.js
import express from 'express';
import { reviewResume } from '../controller/reviewController.js';
import { uploadImg as multer } from '../middlewares/multer.js';

const router = express.Router();

router.post('/review', multer.single("resume"), reviewResume);

export default router;
