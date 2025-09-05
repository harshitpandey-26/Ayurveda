import repositories from "../repositories/index.js";
import {
  AppError,
  ValidationError,
  DatabaseError,
  NotFoundError,
} from "../utils/error/app-error.js";

const therapistRepository = new repositories.TherapistsRepository();

const therapistAvailabilityRepo =
  new repositories.TherapistAvailabilityRepository();

const availabilitySlotRepo = new repositories.AvailabilitySlotRepository();

export async function updateTherapistProfile(userId, data) {
  console.log("inside therapist service");
  try {
    if (!userId) {
      throw new ValidationError(
        "User ID is required to update therapist profile"
      );
    }

    let therapist = await therapistRepository.getByUserId(userId);

    if (!therapist) {
      therapist = await therapistRepository.create({ userId, ...data });
    } else {
      await therapistRepository.updateByUserId(userId, data);
      therapist = await therapistRepository.getByUserId(userId);
    }

    return therapist;
  } catch (err) {
    if (err instanceof ValidationError || err instanceof NotFoundError) {
      throw err;
    }

    if (err.name === "SequelizeValidationError") {
      throw new ValidationError(err.message);
    }

    if (err.name === "SequelizeDatabaseError") {
      throw new DatabaseError(err.message);
    }
    throw new DatabaseError(err);
  }
}

export async function addTherapistAvailabilityDetails(
  userId,
  { day_of_week, start_time, end_time }
) {
  console.log("inside therapist time slot filling service");

  try {
    const therapist = await therapistRepository.getByUserId(userId);

    if (!therapist) {
      throw new ValidationError("Therapist not found for this userId");
    }

    if (!day_of_week || !start_time || !end_time) {
      throw new ValidationError(
        "day_of_week, start_time and end_time are required"
      );
    }

    if (start_time >= end_time) {
      throw new ValidationError("Start time must be before end time");
    }

    let availability = await therapistAvailabilityRepo.findByDayOfWeek({
      therapistId: therapist.id,
      day_of_week,
    });

    if (!availability) {
      availability = await therapistAvailabilityRepo.create({
        therapistId: therapist.id,
        day_of_week,
      });
    }

    // Check if a slot already exists with same timing
    const existingSlot = await availabilitySlotRepo.findBySlot({
      availabilityId: availability.id,
      start_time,
      end_time,
    });

    if (existingSlot) {
      throw new ValidationError("This slot already exists");
    }

    // Optional: Check for overlapping slots
    const overlappingSlot = await availabilitySlotRepo.findOverlapping({
      availabilityId: availability.id,
      start_time,
      end_time,
    });

    if (overlappingSlot) {
      throw new ValidationError("This slot overlaps with an existing one");
    }

    const slot = await availabilitySlotRepo.create({
      availabilityId: availability.id,
      start_time,
      end_time,
    });

    return {
      availability,
      slot,
    };
  } catch (error) {
    throw new DatabaseError(error);
  }
}
