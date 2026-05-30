import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization
    if (!header) {
      return res.status(400).json({ msg: 'No token provided' })
    }
    const token = header.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid token' })
  }
}