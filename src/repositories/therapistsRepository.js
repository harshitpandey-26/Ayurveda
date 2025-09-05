import db from "../models/index.js";
import CrudRepository from "./crudRepository.js";

class TherapistsRepository extends CrudRepository {
  constructor() {
    super(db.Therapist);
  }

}

export default TherapistsRepository;
