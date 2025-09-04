export class AppError extends Error {
  constructor(message, statusCode, errorCode, details, loggerLevel = "info") {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    this.loggerLevel = loggerLevel;
  }
}

export class NotFoundError extends AppError {
  constructor(resource, query) {
    super(`${resource} not found`, 404, "NOT_FOUND", { query },"warn");
  }
}

export class ValidationError extends AppError {
  constructor(errors) {
    super("Validation failed", 400, "VALIDATION_ERROR", errors,"warn");
  }
}

export class DatabaseError extends AppError {
  constructor(err) {
    super("Database error", 500, "DB_ERROR", { original: err.message },"error");
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401, "UNAUTHORIZED","","warn");
  }
}
