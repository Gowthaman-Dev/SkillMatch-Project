import express from 'express'
import {
    applyJob, getMyApplications,
    getJobApplications, getAllCompanyApplications,
    updateStatus
} from '../controllers/applicationController.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

// Candidate routes
router.post('/apply/:jobId', verifyToken, upload.single('resume'), applyJob)
router.get('/my-applications', verifyToken, getMyApplications)

// Company routes
router.get('/job-applications/:jobId', verifyToken, getJobApplications)
router.get('/all-applications', verifyToken, getAllCompanyApplications)
router.put('/status/:applicationId', verifyToken, updateStatus)

export default router