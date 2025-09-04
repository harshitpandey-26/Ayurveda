import bcrypt from "bcrypt";
import { findUserByEmail } from "./userService.js";
import { generateToken } from "../utils/helper/jwt.js";
import { UnauthorizedError } from "../utils/error/app-error.js";
import {
  AppError,
  ValidationError,
  DatabaseError,
  NotFoundError,
} from "../utils/error/app-error.js";
import repository from '../repositories/index.js';

const userRepository = new repository.UserRepository;

export async function register({name,email,password,role}){
  console.log("inside register auth service");
    try {
      const hashedPassword = await bcrypt.hash(password,10);
      const user = await userRepository.create({name,email,password:hashedPassword,role});
      return user;
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        throw new ValidationError(
          error.errors.map((e) => ({ field: e.path, message: e.message }))
        );
      }
      throw new DatabaseError(error);
    }
}

export async function login({ email, password }) {
  console.log("inside login auth service");
  const user = await findUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return { user:safeUser , token };
}
