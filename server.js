import express from "express"
import errorHandler from './middleware/errorhandler.js'
import { limiter } from './middleware/ratelimit.js'
import dotenv from "dotenv"
import helmet from "helmet";
import hpp from "hpp";
import cors from "cors";
import compression from "compression"
import router from "./routes/taskRoute.js"
import ApiError from "./middleware/class.js";
import cookieParser from 'cookie-parser'
import connectDB from "./config/db.js"
const app = express();
app.set('trust proxy', 1);
dotenv.config()
connectDB()
app.use(compression());

app.use(helmet());

const allowedOrigins = [
  "http://localhost:3000",
  "https://render.logger"
]
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    else {
      callback(new Error("cors not allow"), null)
    }
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE','PUT'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(limiter)


app.use(express.json());
app.use(cookieParser());


app.use(hpp());

app.use("/", router);
app.use((req, res, next) => {
  next(new ApiError(`Can not find ${req.originalUrl} on this server`, 404))
})
app.use(errorHandler)
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`server running on port ${PORT} `)
})
