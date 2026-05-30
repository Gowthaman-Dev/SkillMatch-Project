import UserModel from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, number, password, role } = req.body

    // Validate all fields
    if (!username || !email || !number || !password || !role) {
      return res.status(400).json({ msg: 'Please fill all fields' })
    }

    // Check role valid
    if (!['candidate', 'company'].includes(role)) {
      return res.status(400).json({ msg: 'Invalid role selected' })
    }

    // Check email already exist
    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const newUser = await UserModel.create({
      username, email, number,
      password: hashedPassword,
      role
    })

    res.status(201).json({
      msg: 'Registration successful',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role
      }
    })

  } catch (error) {
    console.log('Register Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ msg: 'Please fill all fields' })
    }

    // Find user
    const user = await UserModel.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email' })
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' })
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      msg: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    console.log('Login Error:', error)
    res.status(500).json({ msg: 'Server error' })
  }
}