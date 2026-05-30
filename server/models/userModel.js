import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  number:   { type: String, required: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['candidate', 'company'], required: true }
},{timestamps:true})

const userModel = mongoose.model("skillmatch_users",userSchema)

export default userModel