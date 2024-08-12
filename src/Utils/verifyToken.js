const jwt = require('jsonwebtoken');
const appError = require('./appError');

module.exports = verifyToken = async (req , res , next)=>{
    const auth = req.headers['Authorization'] || req.headers['authorization'];
    if(!auth){
        return next(appError.create(401 , 'token is required'));
    }
    const token = auth.split(' ')[1];
    if(!token){
        return next(appError.create(401 , 'token is required'));
    }
    try{
        const decoded = await jwt.verify(token , process.env.JWT_KEY);
        next();
    }catch(e){        
        return next(appError.create(401 , 'invalid token'));
    }
}