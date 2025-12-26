import { Router } from "express";
import {router as v1Router} from "./v1/index.js"
import {router as v2Router} from "./v2/index.js"
export const router = Router();

router.use("/v1", v1Router );
router.use("/v2", v2Router);