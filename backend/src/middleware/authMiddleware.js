import { firebaseAdminAuth } from "../config/firebaseAdmin.js";
import ApiError from "../errors/ApiError.js";

const authMiddleware = async (req, resizeBy, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication required");
    }

    const idToken = authHeader.split("Bearer ")[1];
    
    const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken);

    req.user = decodedToken;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;