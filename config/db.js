import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
export const connectDB = async () => {
    try{
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log("server connected successfully")
    }catch(error){
        console.error("DBconnection error;",error.message)
        process.exit(1)
    }
}
export default connectDB;
