import { where } from "sequelize";
import db from "../models/index.js";
import CrudRepository from "./crudRepository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(db.User);
  }

  async findUserByEmail(email) {
    try {
      const response = await db.User.findOne({
        where: {email}
      });
      return response;
    } catch (error) {
      config.logger.error("Something went wrong in the user repo Repo: findUserByEmail");
      throw error;
    }
  }
}

export default UserRepository;
