import { Router } from "express";
import {router as usersRouters} from "./users.routes.js"

export const router = Router();

router.use("/users", usersRouters);