import mongoose from "mongoose";

// a data model is created from a data shema

const userSchema = new mongoose.Schema({
    username: {type:String, required: true, trim:true},
    role: {type: String, enum: ["user","admin"], default:"user"},
    email: {type: String, required: true, unique: true, lowercase: true},
    password: {type: String, reuired: true, minlength: 6, select: false},
},
{
    timestamps: true,
}
);

// mongodb will automaticaly create users collection
export const User = mongoose.model("User", userSchema);

