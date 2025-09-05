import jwt from "jsonwebtoken";

import config from '../config/index.js';

export default function authMiddleware(req, res, next) {
  console.log("inside auth middleware");
  try {
    // "Authorization: Bearer <token>"
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        config.logger.warn("Authorisation header missing.")
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    if (!token) {
        config.logger.warn("Invalid token format.")
      return res.status(401).json({ message: "Invalid token format" });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;

    config.logger.info(`User authenticated: ${decoded.id || decoded.email || decoded.role}`);
    
    next();
  } catch (err) {
    config.logger.error("JWT verification failed", { error: err.message, stack: err.stack });
    return res.status(401).json({ message: "Unauthorized", error: err.message });
  }
}
