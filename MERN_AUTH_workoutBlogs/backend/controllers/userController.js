const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: 3600});
}

const signupPost = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.create({email, password});
        const token = createToken(user._id);
        res.status(200).json({user, token});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const loginPost = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({user, token});
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    signupPost,
    loginPost
}