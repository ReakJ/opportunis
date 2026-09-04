import { firebaseAdminAuth } from "../config/firebaseAdmin.js";

const authMiddleware = async (req, resizeBy, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return resizeBy.status(401).json({
        message: "Authentication required",
      });
    }

    const idToken = authHeader.split("Bearer ")[1];
    
    const decodedToken = await firebaseAdminAuth.verifyIdToken(idToken);

    req.user = decodedToken;

    next();
  } catch (error) {
      return res.status(401).json({
        message: "Invalid or expired authentication token",
    });
  }
};

export default authMiddleware;