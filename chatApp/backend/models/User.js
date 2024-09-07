import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        requied: true,
        minLength: 6
    },
    profilePic: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
}, {timestamps:true})

const User = mongoose.model("User", userSchema);

export default User;