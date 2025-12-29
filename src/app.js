import express from "express";
import cors from "cors"
import {router as apiRouter} from "./routes/index.js"

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

app.use("/api", apiRouter)