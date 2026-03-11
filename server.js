import express from "express"
import errorHandler from './middleware/errorhandler.js'
import dotenv from "dotenv"
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression"
import router from "./routes/taskRoute.js"
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from "./config/db.js"
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors())
app.use(hpp());
app.use(compression());
const PORT = process.env.PORT || 5000;
connectDB();
app.use("/",router);
app.use(errorHandler)
app.listen(PORT,()=> {
  console.log(`server running on port ${PORT} `)  
})