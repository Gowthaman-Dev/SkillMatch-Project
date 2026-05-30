import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  jobId:       { type: mongoose.Schema.Types.ObjectId, ref: 'skillmatch_jobs', required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: 'skillmatch_users', required: true },
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  experience:  { type: String },
  skills:      { type: String },
  education:   { type: String },
  currentCompany: { type: String },
  expectedSalary: { type: String },
  availability:   { type: String },
  coverLetter:    { type: String },
  resumePath:     { type: String },   // file path
  status:         { type: String, default: 'pending' }  // pending, reviewed, rejected
}, { timestamps: true })

const ApplicationModel = mongoose.model('skillmatch_applications', applicationSchema)
export default ApplicationModel