import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createEmployeeProfile, createRecruiterProfile, syncUser, updateRole } from "../controllers/onboardingController.js";

const router = express.Router();

router.post("/sync", authMiddleware, syncUser);
router.patch("/role", authMiddleware, updateRole);
router.post("/employee", authMiddleware, createEmployeeProfile);
router.post("/recruiter", authMiddleware, createRecruiterProfile);

export default router;