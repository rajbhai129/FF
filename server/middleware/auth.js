import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not provided",
        error: true,
        success: false,
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
      req.userId = decoded.id;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({
          message: "Token expired. Please login again.",
          error: true,
          success: false,
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(403).json({
          message: "Invalid token",
          error: true,
          success: false,
        });
      }
      return res.status(500).json({
        message: "Token verification failed",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error in authentication middleware",
      error: true,
      success: false,
    });
  }
};

export default auth;
