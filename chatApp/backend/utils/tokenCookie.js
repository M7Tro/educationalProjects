import jwt from 'jsonwebtoken';

export default function jwtCookie(userId, res){
    const token = jwt.sign({userId}, process.env.SECRET, {expiresIn:"1d"});
    res.cookie("jwt", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV !== "development"
    });
}