import asyncHandler from "../utils/asyncHandler.js";
import { patientService } from "../services/index.js";
import { successResponse } from "../utils/common/success-response.js";
import { StatusCodes } from "http-status-codes";

/**
 * PATCH - /patients/
 * */ 
export const updatePatientProfile = asyncHandler(async (req, res) => {
  console.log("inside patient update controller");
  const { age, gender, allergies, conditions } = req.body;
  const userId = req.user.id;
  const updated = await patientService.updateProfile(userId, {
    age,
    gender,
    allergies,
    conditions,
  });
  return successResponse(
    res,
    StatusCodes.OK,
    "Patient profile updated",
    updated
  );
});
