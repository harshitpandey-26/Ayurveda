import repositories from "../repositories/index.js";
import {
  AppError,
  ValidationError,
  DatabaseError,
  NotFoundError,
} from "../utils/error/app-error.js";

const patientRepository = new repositories.PatientRepository();

export async function updateProfile(userId, data) {
  console.log("inside patient service");
  try {
    if (!userId) {
      throw new ValidationError(
        "User ID is required to update patient profile"
      );
    }

    let patient = await patientRepository.getByUserId(userId);

    if (!patient) {
      patient = await patientRepository.create({ userId, ...data });
    } else {
      await patientRepository.updateByUserId(userId, data);
      patient = await patientRepository.getByUserId(userId);
    }

    return patient;
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
    throw new AppError("Failed to update patient profile", 500, err);
  }
}
