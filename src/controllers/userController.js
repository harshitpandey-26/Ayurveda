import { userService } from "../services/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../utils/common/success-response.js";
import config from "../config/index.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("inside controller");
  const { name,email,password } = req.body;
  const user = await userService.createUser({
    name,
    email,
    password
  });

  config.logger.info("user created successfully", user);

  return successResponse(
    res,
    StatusCodes.CREATED,
    "user created successfully",
    user
  );
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const user = await userService.getAllUsers();
  return successResponse(
    res,
    StatusCodes.OK,
    "Successfully completed the request",
    user
  );
});

export const getUsersByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userService.getUsersByID(id);
  return successResponse(
    res,
    StatusCodes.OK,
    `Successfully fetched the user with id:${id}`,
    user
  );
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await userService.deleteUser(id);

  config.logger.info("user deleted successfully", user);

  return successResponse(
    res,
    StatusCodes.OK,
    `Successfully deleted the user with id:${id}`,
    user
  );
});

export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password  } = req.body;
  const { id } = req.params;

  const user = await userService.updateUser(id, {
    modelNumber,
    capacity,
  });

  config.logger.info(`user with id:${id} updated successfully`, user);

  return successResponse(
    res,
    StatusCodes.OK,
    `Successfully updated the user with id:${id}`,
    user
  );
});
