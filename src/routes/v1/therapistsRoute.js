import express from "express";
import { therapistController } from "../../controllers/index.js";

const router = express.Router();

router.patch('/',therapistController.updateTherapistProfile);

export default router;
