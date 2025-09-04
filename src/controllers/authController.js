import { authService } from "../services/index.js";
import asyncHandler from "../utils/asyncHandler.js";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../utils/common/success-response.js";
import config from "../config/index.js";

export const register = asyncHandler(async (req, res) => {
  console.log("inside auth controller");
  const { name, email, password, role } = req.body;
  const user = await authService.register({
    name,
    email,
    password,
    role,
  });

  config.logger.info("user created successfully", user);

  return successResponse(
    res,
    StatusCodes.CREATED,
    "User created successfully",
    user
  );
});

export const login = asyncHandler(async (req, res) => {
  console.log("inside login controller");
  const { email, password } = req.body;

  const { user, token } = await authService.login({ email, password });

  config.logger.info("user logged in successfully", user);

  return successResponse(res, StatusCodes.OK, "User logged in successfully", {
    user,
    token,
  });
});
