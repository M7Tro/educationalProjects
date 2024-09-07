//This middleware gets a cookie token, decoded it, attaches it to the request object.
import jwt from 'jsonwebtoken';
export const protectRoute = (req, res, next) => {
    const token = req.cookies.jwt;
    if(!token){
        res.status(400).json({error: "User is not authenticated"});
        next();
    }
    const decoded = jwt.verify(token, process.env.SECRET);
    req.userId = decoded.userId;
    next();
}