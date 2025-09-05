import express from "express";
import { patientController } from "../../controllers/index.js";

const router = express.Router();

router.patch('/',patientController.updatePatientProfile);

export default router;
