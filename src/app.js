import express from "express";
import cors from "cors"
import {router as apiRouter} from "./routes/index.js"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import { limiter } from "./middlewares/rateLimit.js";


export const app = express();

app.set("trust proxy", 1)

app.use(helmet());

const corsOption = {
    origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://fornt-end-connect-back-end.vercel.app",
    ],
credentials:true, // allow cookies to be sent
};

app.use(cors(corsOption))

app.use(limiter);


app.use(express.json());

app.use(cookieParser())

app.use("/api", apiRouter)

// Catch-all for 404 Not found
app.use((req, res, next) => {
    const error = new Error(`Not found: ${req.method} ${req.originalUrl}`)
    error.name = "NotFoundError"
    error.status = 404
    next(error)
})

// Centralized Error Handlind Middlewere
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        seccess: false,
        message: err.message || "Internal Server Error",
        path:req.originalUrl,
        method:req.method,
        timestamp:new Date().toISOString(),
        stack:err.stack,
    })
})