import { Router } from "express";
import {
    testAPI,
    getUsers,
    createUser,
    deleteUser
} from "../../module/users/users.controller.js";


export const router = Router()

router.get("/test", testAPI);

router.get("/", getUsers);

router.post("/", createUser);

// The function inside ia called "Router Handler or Controller"
router.delete("/:id", deleteUser);

