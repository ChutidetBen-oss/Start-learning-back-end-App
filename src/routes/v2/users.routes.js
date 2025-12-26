import { Router } from "express";
import {
    getUsers2,
    createUser2,
    deleteUser2,
    updateUser2,
    getUser2
} from "../../module/users/users.controller.js";


export const router = Router()


router.get("/", getUsers2);

router.get("/:id", getUser2);

router.post("/", createUser2);

// The function inside ia called "Router Handler or Controller"
router.delete("/:id", deleteUser2);

router.patch("/:id", updateUser2)
