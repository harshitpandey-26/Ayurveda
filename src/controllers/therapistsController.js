import asyncHandler from "../utils/asyncHandler.js";
import { therapistService } from "../services/index.js";
import { successResponse } from "../utils/common/success-response.js";
import { StatusCodes } from "http-status-codes";

/**
 * PATCH - /therapist/
 * BODY - name, educational_qualification, experience_years, price_per_session, session_duration 
 * */ 
export const updateTherapistProfile = asyncHandler(async (req, res) => {
  console.log("inside therapist update controller");
  const { name, educational_qualification, experience_years, price_per_session, session_duration } = req.body;
  const userId = req.user.id;
  const updated = await therapistService.updateTherapistProfile(userId, {
    name,
    educational_qualification,
    experience_years,
    price_per_session,
    session_duration
  });
  return successResponse(
    res,
    StatusCodes.OK,
    "therapist profile updated",
    updated
  );
});

/**
 * POST - /therapist/availability
 * BODY - day_of_week,start_time,end_time
 */
export const addTherapistAvailabilityDetails = asyncHandler(async (req,res) => {
  console.log("inside therapist time filling controller");
  const { day_of_week, start_time, end_time } = req.body;
  const userId = req.user.id;
  const {availability,slot} = await therapistService.addTherapistAvailabilityDetails(userId, {
    day_of_week,
    start_time,
    end_time
  });
  return successResponse(
    res,
    StatusCodes.OK,
    "therapist profile updated",
    {availability,slot}
  );
})
