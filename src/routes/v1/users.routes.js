import { Router } from "express";
import {
    getUsers1,
    createUser1,
    deleteUser1
} from "../../module/users/users.controller.js";


export const router = Router()

router.get("/", getUsers1);

router.post("/", createUser1);

// The function inside ia called "Router Handler or Controller"
router.delete("/:id", deleteUser1);

