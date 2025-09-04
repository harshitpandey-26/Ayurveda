import repositories from "../repositories/index.js";
import {
  AppError,
  ValidationError,
  DatabaseError,
  NotFoundError,
} from "../utils/error/app-error.js";

const userRepository = new repositories.UserRepository();

export const getAllUsers = async () => {
  try {
    const user = await userRepository.getAll();
    return user;
  } catch (error) {
    throw new DatabaseError(error);
  }
};

export const getUsersByID = async (id) => {
  try {
    const user = await userRepository.get(id);
    if (!user) {
      throw new NotFoundError("user", id);
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new DatabaseError(error);
  }
};

export const findUserByEmail = async (email) => {
  try {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundError("user", email);
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new DatabaseError(error);
  }
};


export const deleteUser = async (id) => {
  try {
    const user = await userRepository.destroy(id);
    if (!user) {
      throw new NotFoundError("user", id);
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new DatabaseError(error);
  }
}

export const updateUser = async (id,data) => {

  try {
    
    const user = await userRepository.update(id,data);
    if (!user) {
      throw new NotFoundError("user", id);
    }
    return user;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new DatabaseError(error);
  }

}