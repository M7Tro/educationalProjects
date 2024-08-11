const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    try{
        const {id} = jwt.verify(token, process.env.SECRET);
        //console.log("Decoded: ", decoded);
        req.userId = id;
        next();
    }catch(err){
        //console.log("error while decoding: ", err.message);
        res.status(400).json({error: "You need to login"})
    }
}

module.exports = requireAuth;