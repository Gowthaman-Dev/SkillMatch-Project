import ProfileModel from '../models/profileModel.js'
import fs from 'fs'

// GET - My Profile
export const getMyProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ userId: req.user.id })

    if (!profile) {
      return res.status(200).json({ profile: null })
    }

    res.status(200).json({ profile })
  } catch (error) {
    console.log('Get Profile Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}

// POST - Save Profile
export const saveProfile = async (req, res) => {
  try {
    const {
      username, email, number, location, bio,
      jobTitle, company, experience, expectedSalary,
      availability, workMode, degree, college,
      graduationYear, specialization, skills,
      languages, certifications, linkedin,
      github, portfolio, bannerColor, role,
      removeProfilePhoto, removeBannerImage
    } = req.body

    let profile = await ProfileModel.findOne({ userId: req.user.id })

    const updateData = {
      userId: req.user.id,
      username, email, number, location, bio,
      jobTitle, company, experience, expectedSalary,
      availability, workMode, degree, college,
      graduationYear, specialization, skills,
      languages, certifications, linkedin,
      github, portfolio, bannerColor, role
    }

    // Profile photo upload
    if (req.files?.profilePhoto) {
      if (profile?.profilePhoto && fs.existsSync(profile.profilePhoto)) {
        fs.unlinkSync(profile.profilePhoto)
      }
      updateData.profilePhoto = req.files.profilePhoto[0].path
    }

    // Banner image upload
    if (req.files?.bannerImage) {
      if (profile?.bannerImage && fs.existsSync(profile.bannerImage)) {
        fs.unlinkSync(profile.bannerImage)
      }
      updateData.bannerImage = req.files.bannerImage[0].path
    }

    // Remove photo
    if (removeProfilePhoto === 'true') {
      if (profile?.profilePhoto && fs.existsSync(profile.profilePhoto)) {
        fs.unlinkSync(profile.profilePhoto)
      }
      updateData.profilePhoto = null
    }

    // Remove banner
    if (removeBannerImage === 'true') {
      if (profile?.bannerImage && fs.existsSync(profile.bannerImage)) {
        fs.unlinkSync(profile.bannerImage)
      }
      updateData.bannerImage = null
    }

    if (profile) {
      profile = await ProfileModel.findOneAndUpdate(
        { userId: req.user.id },
        updateData,
        { new: true }
      )
    } else {
      profile = await ProfileModel.create(updateData)
    }

    console.log('Profile saved for userId:', req.user.id)
    res.status(200).json({ msg: 'Profile saved successfully', profile })

  } catch (error) {
    console.log('Save Profile Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}

// ✅ GET - Candidate profile by userId (Company பார்க்க)
export const getCandidateProfile = async (req, res) => {
  try {
    const { userId } = req.params

    console.log('Fetching profile for userId:', userId)

    const profile = await ProfileModel.findOne({ userId: userId })

    console.log('Profile found:', profile ? 'Yes' : 'No')

    if (!profile) {
      return res.status(404).json({
        msg: 'Profile not found - Candidate has not set up profile yet'
      })
    }

    res.status(200).json({ profile })
  } catch (error) {
    console.log('Get Candidate Profile Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}