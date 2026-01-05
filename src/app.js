import express from "express";
import cors from "cors"
import {router as apiRouter} from "./routes/index.js"
import cookieParser from "cookie-parser"

export const app = express();

const corsOption = {
    origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "https://fornt-end-connect-back-end.vercel.app",
    ]
}

app.use(cors(corsOption))

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