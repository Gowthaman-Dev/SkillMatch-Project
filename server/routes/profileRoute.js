import express from 'express'
import { getMyProfile, saveProfile, getCandidateProfile } from '../controllers/profileController.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import upload from '../middleware/uploadMiddleware.js'

const router = express.Router()

// My profile
router.get('/me', verifyToken, getMyProfile)

// Save profile with photo upload
router.post('/save', verifyToken,
  upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'bannerImage', maxCount: 1 }
  ]),
  saveProfile
)

// View candidate profile (company use)
router.get('/candidate/:userId', verifyToken, getCandidateProfile)

// இதை add பண்ணுங்க - test பண்ண
router.get('/candidate/:userId', verifyToken, async (req, res) => {
  try {
    console.log('Looking for userId:', req.params.userId)  // ← debug
    const profile = await ProfileModel.findOne({ userId: req.params.userId })
    console.log('Found profile:', profile)  // ← debug
    
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' })
    }
    res.status(200).json({ profile })
  } catch (error) {
    console.log('Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
})

export default router