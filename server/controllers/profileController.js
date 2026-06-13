import ProfileModel from "../models/profileModel.js";
import fs from "fs";

export const getMyProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ userId: req.user.id });
    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const saveProfile = async (req, res) => {
  try {
    const { username, email, number, location, bio, jobTitle, company, experience, expectedSalary, availability, workMode,
      degree, college, graduationYear, specialization, skills, languages, certifications, linkedin, github, portfolio, bannerColor, role,
      removeProfilePhoto, removeBannerImage } = req.body;

    let profile = await ProfileModel.findOne({ userId: req.user.id });
    const updateData = { userId: req.user.id, username, email, number, location, bio, jobTitle, company, experience,
      expectedSalary, availability, workMode, degree, college, graduationYear, specialization, skills, languages,
      certifications, linkedin, github, portfolio, bannerColor, role };

    if (req.files?.profilePhoto) {
      if (profile?.profilePhoto && fs.existsSync(profile.profilePhoto)) fs.unlinkSync(profile.profilePhoto);
      updateData.profilePhoto = req.files.profilePhoto[0].path;
    }
    if (req.files?.bannerImage) {
      if (profile?.bannerImage && fs.existsSync(profile.bannerImage)) fs.unlinkSync(profile.bannerImage);
      updateData.bannerImage = req.files.bannerImage[0].path;
    }
    if (removeProfilePhoto === "true") {
      if (profile?.profilePhoto && fs.existsSync(profile.profilePhoto)) fs.unlinkSync(profile.profilePhoto);
      updateData.profilePhoto = null;
    }
    if (removeBannerImage === "true") {
      if (profile?.bannerImage && fs.existsSync(profile.bannerImage)) fs.unlinkSync(profile.bannerImage);
      updateData.bannerImage = null;
    }

    profile = profile
      ? await ProfileModel.findOneAndUpdate({ userId: req.user.id }, updateData, { new: true })
      : await ProfileModel.create(updateData);
    res.status(200).json({ msg: "Profile saved", profile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const getCandidateProfile = async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ msg: "Profile not found" });
    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};