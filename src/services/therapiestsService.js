import repositories from "../repositories/index.js";
import {
  AppError,
  ValidationError,
  DatabaseError,
  NotFoundError,
} from "../utils/error/app-error.js";

const therapistRepository = new repositories.TherapistsRepository();

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
