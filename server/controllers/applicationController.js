import ApplicationModel from '../models/applicationModel.js'
import JobModel from '../models/jobModel.js'

// Candidate - Apply for job
export const applyJob = async (req, res) => {
  try {
    const {
      name, email, phone, experience, skills,
      education, currentCompany, expectedSalary,
      availability, coverLetter
    } = req.body

    const { jobId } = req.params

    if (!name || !email || !phone) {
      return res.status(400).json({ msg: 'Name, Email, Phone required' })
    }

    if (!req.file) {
      return res.status(400).json({ msg: 'Resume upload required' })
    }

    // ✅ Check by both candidateId AND email
    const alreadyApplied = await ApplicationModel.findOne({
      jobId,
      $or: [
        { candidateId: req.user.id },
        { email: email.toLowerCase().trim() }
      ]
    })

    if (alreadyApplied) {
      return res.status(400).json({
        msg: 'You have already applied for this job'
      })
    }

    const newApplication = await ApplicationModel.create({
      jobId,
      candidateId: req.user.id,
      name,
      email: email.toLowerCase().trim(),  // ✅ lowercase save
      phone, experience, skills,
      education, currentCompany, expectedSalary,
      availability, coverLetter,
      resumePath: req.file.path
    })

    res.status(201).json({
      msg: 'Application submitted successfully',
      application: newApplication
    })

  } catch (error) {
    console.log('Apply Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}
// Candidate - Get my applications
export const getMyApplications = async (req, res) => {
  try {
    const applications = await ApplicationModel
      .find({ candidateId: req.user.id })
      .populate('jobId', 'title company salary employmentType skills')
      .sort({ createdAt: -1 })

    res.status(200).json({ applications })
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
}

// Company - Get applications for specific job
export const getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params

    const applications = await ApplicationModel
      .find({ jobId })
      .populate('candidateId', '_id username email')
      .sort({ createdAt: -1 })

    res.status(200).json({ applications })
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
}

// ✅ Company - Get ALL applications for their jobs
export const getAllCompanyApplications = async (req, res) => {
  try {
    // Company-oda jobs எல்லாம் find பண்ணு
    const myJobs = await JobModel.find({ postedBy: req.user.id })
    const jobIds = myJobs.map(job => job._id)

    // அந்த jobs-க்கு வந்த applications fetch பண்ணு
    const applications = await ApplicationModel
      .find({ jobId: { $in: jobIds } })
      .populate('jobId', 'title company location')
      .populate('candidateId', '_id username email')  // ✅ _id populate
      .sort({ createdAt: -1 })

    console.log('Applications found:', applications.length)
    console.log('First candidateId:', applications[0]?.candidateId)

    res.status(200).json({ applications })
  } catch (error) {
    console.log('getAllCompanyApplications Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}

// Company - Update application status
export const updateStatus = async (req, res) => {
  try {
    const { applicationId } = req.params
    const { status } = req.body

    const updated = await ApplicationModel.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    )

    if (!updated) {
      return res.status(404).json({ msg: 'Application not found' })
    }

    res.status(200).json({ msg: 'Status updated successfully', application: updated })
  } catch (error) {
    console.log('Update Status Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}