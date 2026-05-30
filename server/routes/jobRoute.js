import express from 'express'
import { postJob, getAllJobs, getMyJobs, deleteJob , repostJob } from '../controllers/jobController.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import JobModel from '../models/jobModel.js'

const router = express.Router()

// Public
router.get('/all', getAllJobs)

// Single job fetch
router.get('/single/:id', async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id)
    if (!job) return res.status(404).json({ msg: 'Job not found' })
    res.status(200).json({ job })
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
})

// Protected
router.post('/post', verifyToken, postJob)
router.get('/myjobs', verifyToken, getMyJobs)
router.delete('/delete/:id', verifyToken, deleteJob)
router.put('/repost/:id', verifyToken, repostJob)
export default router   // ← இது இருக்கா check பண்ணுங்க!