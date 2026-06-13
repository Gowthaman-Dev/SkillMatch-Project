import JobModel from "../models/jobModel.js";

const checkAndExpireJobs = async () => {
  const now = new Date();
  await JobModel.updateMany({ expiresAt: { $lt: now }, isExpired: false }, { $set: { isExpired: true } });
};

export const postJob = async (req, res) => {
  try {
    const { title, company, category, location, workMode, employmentType, experience, salary, skills, description, expiryDays } = req.body;
    if (!title || !company || !category || !location) return res.status(400).json({ msg: "Required fields missing" });
    const skillsArray = skills ? skills.split(",").map(s => s.trim()) : [];
    const days = parseInt(expiryDays) || 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);
    const job = await JobModel.create({
      title, company, category, location, workMode, employmentType, experience, salary, skills: skillsArray, description,
      postedBy: req.user.id, expiryDays: days, expiresAt, isExpired: false,
    });
    res.status(201).json({ msg: "Job posted", job });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    await checkAndExpireJobs();
    const jobs = await JobModel.find({ isExpired: false }).sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getSingleJob = async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) return res.status(404).json({ msg: "Job not found" });
    res.status(200).json({ job });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getMyJobs = async (req, res) => {
  try {
    await checkAndExpireJobs();
    const jobs = await JobModel.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await JobModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Job deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const repostJob = async (req, res) => {
  try {
    const { expiryDays } = req.body;
    const days = parseInt(expiryDays) || 30;
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + days);
    const updated = await JobModel.findByIdAndUpdate(
      req.params.id,
      { expiresAt, expiryDays: days, isExpired: false },
      { new: true }
    );
    res.status(200).json({ msg: "Job reposted", job: updated });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};