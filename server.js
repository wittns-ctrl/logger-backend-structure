import express from "express"
import errorHandler from './middleware/errorhandler.js'
import dotenv from "dotenv"
import router from "./routes/taskRoute.js"
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from "./config/db.js"
const app = express();
app.use(express.json());
app.use(cookieParser())
const PORT = process.env.PORT || 5000;
connectDB();
app.use("/",router);
app.use(errorHandler)
app.listen(PORT,()=> {
  console.log(`server running on port ${PORT} `)  
})