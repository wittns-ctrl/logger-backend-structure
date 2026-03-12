import express from "express"
import errorHandler from './middleware/errorhandler.js'
import limiter from './middleware/ratelimit.js'
import dotenv from "dotenv"
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import compression from "compression"
import router from "./routes/taskRoute.js"
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from "./config/db.js"
const app = express();
app.use(helmet());
app.use(cors())


app.use(express.json());
app.use(cookieParser());


app.use(hpp());

app.use(limiter)

app.use("/",router);

app.use(compression());

app.use(errorHandler)
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT,()=> {
  console.log(`server running on port ${PORT} `)  
})