import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { syncUser } from "../controllers/onboardingController.js";

const router = express.Router();

router.post("/sync", authMiddleware, syncUser);

export default router;