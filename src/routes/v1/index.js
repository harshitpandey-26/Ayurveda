import express from 'express';
import infoController from '../../controllers/index.js';
import authRoute from './authRoute.js';
import patientsRoute from './patientsRoute.js';
import therapistRoute from './therapistsRoute.js';
import authMiddleware from '../../middlewares/authMiddleware.js'; 
import { authorizeRoles } from '../../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/info', infoController.info);

router.use('/auth',authRoute);
router.use('/patient',authMiddleware,authorizeRoles("patient"),patientsRoute);
router.use('/therapist',authMiddleware,authorizeRoles("therapist"),therapistRoute);

export default router;