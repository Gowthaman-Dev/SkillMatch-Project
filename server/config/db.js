import mongoose from "mongoose";

const connectdb = async()=>{
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL)
    console.log(`MongoDb Is Connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error,`Something Error`)
    process.exit(1)
  }
}

export default connectdb