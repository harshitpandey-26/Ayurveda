import db from "../models/index.js";
import CrudRepository from "./crudRepository.js";

class TherapistsRepository extends CrudRepository {
  constructor() {
    super(db.Therapists);
  }

}

export default TherapistsRepository;
