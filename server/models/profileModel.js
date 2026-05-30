import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'skillmatch_users', 
    required: true, 
    unique: true 
  },
  // Basic
  username:    { type: String },
  email:       { type: String },
  number:      { type: String },
  location:    { type: String },
  bio:         { type: String },
  role:        { type: String },
  // Professional
  jobTitle:    { type: String },
  company:     { type: String },
  experience:  { type: String },
  expectedSalary: { type: String },
  availability:   { type: String },
  workMode:       { type: String },
  // Education
  degree:          { type: String },
  college:         { type: String },
  graduationYear:  { type: String },
  specialization:  { type: String },
  // Skills
  skills:          { type: String },
  languages:       { type: String },
  certifications:  { type: String },
  // Social
  linkedin:   { type: String },
  github:     { type: String },
  portfolio:  { type: String },
  // Photos
  profilePhoto: { type: String },  // file path
  bannerImage:  { type: String },  // file path
  bannerColor:  { type: String, default: '#1a1a2e' }
}, { timestamps: true })

const ProfileModel = mongoose.model('skillmatch_profiles', profileSchema)
export default ProfileModel