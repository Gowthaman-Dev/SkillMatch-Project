import express from "express";
import {
  postJob,
  getAllJobs,
  getMyJobs,
  deleteJob,
  repostJob,
  getSingleJob,
} from "../controllers/jobController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", getAllJobs);
router.get("/single/:id", getSingleJob);
router.post("/post", verifyToken, postJob);
router.get("/myjobs", verifyToken, getMyJobs);
router.delete("/delete/:id", verifyToken, deleteJob);
router.put("/repost/:id", verifyToken, repostJob);

export default router;