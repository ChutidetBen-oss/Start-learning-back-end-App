import { Router } from "express";
import {
    getUsers2,
    createUser2,
    deleteUser2,
    updateUser2,
    getUser2,
} from "../../module/users/users.controller.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User}  from "../../module/users/users.model.js";
import {authUser} from "../../middlewares/auth.js"

export const router = Router();

router.get("/", getUsers2);

router.get("/:id", getUser2);

router.post("/", authUser, createUser2);

// The function inside ia called "Router Handler or Controller"
router.delete("/:id", authUser, deleteUser2);

router.patch("/:id", authUser, updateUser2);

//Login a user - jwt signed token (token in cookies)
router.post("/auth/cookie/login", async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: true,
            message: "Email and Password are required",
        });
    }

    try {
        const normalizedEmail = String(email).trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail }).select(
            "+password"
        );

        if (!user) {
            return res.status(401).json({
                error: true,
                message: "User not found...",
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(401).json({
                error: true,
                messege: "Invalid password...",
            });
        }

        //Generat JSON Wed Token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "10m",
        });

        const isProd = process.env.NODE_ENV === "production"

        res.cookie("accessToken", token, {
            httpOnly:true,
            secure:isProd,
            sameSite: isProd ? "none" : "lax",
            path: "/",
            maxAge: 10* 60 * 1000, // 10min
        })

        res.status(200).json({
            error:false,
            messege:"Login successful",
            token:token,
            user:{
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error)
    }
});


//Logout a user
router.post("/auth/cookie/logout", (req, res) =>{
    const isProd = process.env.NODE_ENV === "production"

    res.clearCookie("accessToken", {
        httpOnly:true,
        secure: isProd,
        sameSite : isProd ? "none" : "lax",
        path: "/",
    });

    res.status(200).json({
        error: false,
        message:"Logged out seccesfully",
    });
});


//Check user authentication (check if user has valid token)
router.get("/auth/cookie/me", authUser, async (req, res, next) => {
    try {
        const userId = req.user.user._id

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                error:true,
                messega:"Unauthenticated",
            })
        }

        res.status(200).json({
            error: false,
            user:{
                _id: user._id,
                username:user.username,
                email:user.email,
                role:user.role,
            },
        });

    } catch (error) {
        next(error)
    }
});


