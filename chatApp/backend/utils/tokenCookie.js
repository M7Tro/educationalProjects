import jwt from 'jsonwebtoken';

export default function jwtCookie(userId, res){
    const token = jwt.sign({userId}, process.env.SECRET, {expiresIn:"1d", httpOnly: true, sameSite: "strict"});
    res.cookie("jwt", token);
}