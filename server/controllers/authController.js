import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, number, password, role } = req.body;
    if (!username || !email || !number || !password || !role)
      return res.status(400).json({ msg: "All fields required" });
    if (!["candidate", "company"].includes(role))
      return res.status(400).json({ msg: "Invalid role" });
    const existing = await UserModel.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ username, email, number, password: hashed, role });
    res.status(201).json({
      msg: "Registration successful",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "All fields required" });
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid password" });
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      msg: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};