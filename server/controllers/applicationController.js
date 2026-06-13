import ApplicationModel from "../models/applicationModel.js";
import JobModel from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const { name, email, phone, experience, skills, education, currentCompany, expectedSalary, availability, coverLetter } = req.body;
    const { jobId } = req.params;
    if (!name || !email || !phone) return res.status(400).json({ msg: "Name, Email, Phone required" });
    if (!req.file) return res.status(400).json({ msg: "Resume required" });
    const already = await ApplicationModel.findOne({ jobId, $or: [{ candidateId: req.user.id }, { email: email.toLowerCase().trim() }] });
    if (already) return res.status(400).json({ msg: "Already applied" });
    const application = await ApplicationModel.create({
      jobId, candidateId: req.user.id, name, email: email.toLowerCase().trim(), phone, experience, skills, education,
      currentCompany, expectedSalary, availability, coverLetter, resumePath: req.file.path,
    });
    res.status(201).json({ msg: "Application submitted", application });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await ApplicationModel.find({ candidateId: req.user.id }).populate("jobId", "title company salary employmentType skills").sort({ createdAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getJobApplications = async (req, res) => {
  try {
    const applications = await ApplicationModel.find({ jobId: req.params.jobId }).populate("candidateId", "_id username email").sort({ createdAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllCompanyApplications = async (req, res) => {
  try {
    const myJobs = await JobModel.find({ postedBy: req.user.id });
    const jobIds = myJobs.map(job => job._id);
    const applications = await ApplicationModel.find({ jobId: { $in: jobIds } }).populate("jobId", "title company location").populate("candidateId", "_id username email").sort({ createdAt: -1 });
    res.status(200).json({ applications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await ApplicationModel.findByIdAndUpdate(req.params.applicationId, { status }, { new: true });
    if (!updated) return res.status(404).json({ msg: "Application not found" });
    res.status(200).json({ msg: "Status updated", application: updated });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};