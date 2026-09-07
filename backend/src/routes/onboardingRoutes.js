import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { syncUser, updateRole } from "../controllers/onboardingController.js";

const router = express.Router();

router.post("/sync", authMiddleware, syncUser);
router.patch("/role", authMiddleware, updateRole);

export default router;