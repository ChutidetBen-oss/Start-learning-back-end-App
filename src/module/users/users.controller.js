import { users } from "../../mork-db/users.js";
import { User } from "./users.model.js";


// router mock data
export const getUsers1 = (req, res) => {
    res.status(200).json(users);
    console.log(res);
};
// router get data in database
export const getUsers2 = async (req, res) => {
    try {
        const users = await User.find().select("--password");
        return res.status(200).json({
            seccess: true,
            data: users,
        });
    } catch (error) {
        return res.status(500).json({
            seccess: false,
            data: "Failed to got user.....",
        });
    }
};
// delete mock data user
export const deleteUser1 = (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);

        res.status(200).send(`User with ID ${userId} deleted completed`);
    } else {
        res.status(404).send("User not found.");
    }
};

// delete user in data base
export const deleteUser2 = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await User.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).json({
                seccess: false,
                error: "User not found...",
            })
        }
        return res.status(200).json({
            secess: true,
            data: null,
        })
    } catch (error) {
        return res.status(500).json({
            seccess: false,
            error: "Failed to delete user...",
        })
    }
}
// create data mock
export const createUser1 = (req, res) => {
    const { name, email } = req.body;

    const newUser = {
        id: String(users.length + 1),
        name: name,
        email: email,
    };

    users.push(newUser);

    res.status(201).json(newUser);
};

//route handle: create a new user in the database
export const createUser2 = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password ) {
        return res.status(400).json({
            success: false,
            error: "username, email, and password are required",
        });
    }

    try {
        const doc = await User.create({ username, email, password, role});

        const safe = doc.toObject();
        delete safe.password;

        return res.status(201).json({
            success: true,
            data: safe,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                seccess: false,
                error: "Email already in use!",
            });
        }

        return res.status(500).json({
            success: false,
            error: "Failed to create user...",
        });
    }
};


// router handler : update a user in the database
// ✅ route handler: update a user in the database
export const updateUser2 = async (req, res) => {
    const { id } = req.params;

    const body = req.body;

    try {
        const updated = await User.findByIdAndUpdate(id, body);

        if (!updated) {
            return res.status(404).json({
                success: false,
                error: "User not found...",
            });
        }

        const safe = updated.toObject();
        delete safe.password;

        return res.status(200).json({
            success: true,
            data: safe,
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                error: "Email already in use!",
            });
        }

        return res.status(500).json({
            success: false,
            error: "Failed to update user...",
        });
    }
};

// :white_check_mark: route handler: GET a single user by id from the database
export const getUser2 = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await User.findById(id).select("-password");
        if (!doc) {
            return res.status(404).json({
                success: false,
                error: "User not found...",
            });
        }
        return res.status(200).json({
            success: true,
            data: doc,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Failed to get a user...",
        });
    }
};