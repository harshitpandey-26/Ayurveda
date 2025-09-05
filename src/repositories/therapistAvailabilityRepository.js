import db from "../models/index.js";
import CrudRepository from "./crudRepository.js";

class TherapistAvailabilityRepository extends CrudRepository {
  constructor() {
    super(db.TherapistAvailability);
  }

  async findByDayOfWeek({ therapistId, day_of_week }) {
    console.log("findByDayOfWeek called with:", therapistId, day_of_week);
    try {
      return await this.model.findOne({
        where: { therapistId, day_of_week },
      });
    } catch (error) {
      config.logger.error(
        "Something went wrong in the therapist availabiity Repo: findByDayOfWeek"
      );
      throw error;
    }
  }
}

export default TherapistAvailabilityRepository;
