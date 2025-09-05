// middleware/authorize.js

import { AppError, DatabaseError, UnauthorizedError } from "../utils/error/app-error.js";
import config from '../config/index.js';

export const authorizeRoles = (...roles) => {
    console.log("inside authorize role middleware");
  return (req, res, next) => {
    try {
      if (!req.user) {
        config.logger.warn("User not authenticated");
        return next(new UnauthorizedError("User not authenticated"));
      }

      if(!roles.includes(req.user.role)){
        config.logger.warn("Access denied for user");
        return next(new AppError("Access Denied",403,"FORBIDDEN","","warn"));
      }

      config.logger.info(`User authenticated for role:${req.user.role}`);

      next();
    } catch (error) {
        return next(new DatabaseError(error));
    }
  };
};
