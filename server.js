import express from "express"
import errorHandler from './middleware/errorhandler.js'
import dotenv from "dotenv"
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import compression from "compression"
import router from "./routes/taskRoute.js"
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
dotenv.config()
import connectDB from "./config/db.js"
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(mongoSanitize());
app.use(compression());
app.use(xss());
app.use(hpp());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
connectDB();
app.use("/",router);
app.use(errorHandler)
app.listen(PORT,()=> {
  console.log(`server running on port ${PORT} `)  
})