import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  title:          { type: String, required: true },
  company:        { type: String, required: true },
  category:       { type: String, required: true },
  location:       { type: String, required: true },
  workMode:       { type: String },
  employmentType: { type: String },
  experience:     { type: String },
  salary:         { type: String },
  skills:         [{ type: String }],
  description:    { type: String },
  postedBy:       { type: mongoose.Schema.Types.ObjectId, ref: 'skillmatch_users' },

  // ✅ Expiry fields
  expiryDays:     { type: Number, default: 30 },
  expiresAt:      { type: Date },
  isExpired:      { type: Boolean, default: false }

}, { timestamps: true })

const JobModel = mongoose.model('skillmatch_jobs', jobSchema)
export default JobModel