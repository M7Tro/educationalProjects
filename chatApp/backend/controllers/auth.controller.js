import User from '../models/User.js';
import bcryptjs from 'bcryptjs';
import jwtCookie from '../utils/tokenCookie.js';

const login = async (req, res) => {
    try{
        //Start the validation of provided emails and passwords here: 
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const passwordIsCorrect = await bcryptjs.compare(password, user?.password || "");
        if(!user || !passwordIsCorrect){
            res.status(400).json({message: "Email or password is incorrect"});
        }
        res.status(200).json({
            username: user.username,
            fullname: user.fullname,
            gender: user.gender,
            _id: user._id,
            profilePic: user.profilePic
        })
    }catch(err){
        res.status(500).json({error: err.message})
    }
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

        if(newUser){
            await newUser.save(); 
            jwtCookie(newUser._id, res);
            res.status(200).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic,
                gender: newUser.gender
            })    
        }else{
            res.status(400).json({error:"Invalid user data"});
        }
        

    }catch(err){
        res.status(500).json({error: err.message})
    }
}

export {login, signup, logout};