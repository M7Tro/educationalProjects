import User from '../models/User.js';
import bcryptjs from 'bcryptjs';

const login = async (req, res) => {

}

const logout = async (req, res) => {

}

const signup = async (req, res) => {
    try{
        const {fullname, username, gender, password, confirmedPassword} = req.body;
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({error: "The user name provided already exists"});
        }
        if(password !== confirmedPassword){
            return res.status(400).json({error: "Passwords do not match"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(password, salt);
        
        //The api used in the tutorial was not accessible. I will find a different one later maybe
        const profilePic = "https://api.dicebear.com/9.x/adventurer/svg";

        const newUser = User({
            fullname,
            username,
            password: hash,
            gender,
            profilePic
        })

        await newUser.save(); 
        res.status(200).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })

    }catch(err){
        res.status(500).json({error: err.message})
    }
}

export {login, signup, logout};