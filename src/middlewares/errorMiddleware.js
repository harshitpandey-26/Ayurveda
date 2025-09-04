import config from "../config/index.js";


export default function errorHandler(err, req, res, next) {

    console.log("inside error middleware");

    const loggerLevel =  err.logLevel || "error";
  
  config.logger.error(err.message, {
    level: loggerLevel,
    stack: err.stack,
    details: err.details || null,
    errorCode: err.errorCode || "UNKNOWN_ERROR",
  });

  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errorCode: err.errorCode || "INTERNAL_ERROR",
    details: err.details || null,
  });
}
