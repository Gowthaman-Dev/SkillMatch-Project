import express from "express";
import { getMyProfile, saveProfile, getCandidateProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/me", verifyToken, getMyProfile);
router.post("/save", verifyToken, upload.fields([{ name: "profilePhoto", maxCount: 1 }, { name: "bannerImage", maxCount: 1 }]), saveProfile);
router.get("/candidate/:userId", verifyToken, getCandidateProfile);

export default router;