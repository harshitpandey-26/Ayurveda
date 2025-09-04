import express from 'express';
import infoController from '../../controllers/index.js';
import authRoute from './authRoute.js';

const router = express.Router();

router.get('/info', infoController.info);

router.use('/auth',authRoute);

export default router;