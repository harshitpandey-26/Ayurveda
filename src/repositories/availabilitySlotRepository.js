import db from "../models/index.js";
import CrudRepository from "./crudRepository.js";
import { Op } from "sequelize";  
import normalizeTime from "../utils/helper/normalizeTime.js";

class AvailabilitySlotRepository extends CrudRepository {
  constructor() {
    super(db.AvailabilitySlot);
  }

  async findBySlot({ availabilityId, start_time, end_time }) {
    console.log("findBySlot called with:", availabilityId, start_time, end_time);
    try {
      return await this.model.findOne({
        where: { availabilityId, start_time, end_time },
      });
    } catch (error) {
      config.logger.error(
        "Something went wrong in the availability slot Repo: findBySlot"
      );
      throw error;
    }
  }

  async findOverlapping({ availabilityId, start_time, end_time }) {
    console.log("findOverlapping called with:", availabilityId, start_time, end_time);

    // normalize to HH:mm:ss
    start_time = normalizeTime(start_time);
    end_time = normalizeTime(end_time);

    try {
      return await this.model.findOne({
        where: {
          availabilityId,
          start_time: { [Op.lt]: end_time },
          end_time: { [Op.gt]: start_time },
        },
      });
    } catch (error) {
      config.logger.error(
        "Something went wrong in the availability slot Repo: findOverlapping"
      );
      throw error;
    }
  }
}



export default AvailabilitySlotRepository;
