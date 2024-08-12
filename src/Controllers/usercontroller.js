const bcrypt = require('bcrypt');
const generateToken = require('./../Utils/generateToken');
const User = require('./../Models/userModel');
const Room = require('./../Models/roomModel');
const asyncwrapper = require('./../Middlewares/asyncwrapper');
const appError = require('./../Utils/appError');

const login = asyncwrapper(async (req, res, next)=>{
    const {email , password} = req.body;

    const user = await User.findOne({email : email});
    if(!user){
        return next(appError.create(401 , 'incorrect email or password'));
    }

    const matched = await bcrypt.compare(password , user.password);
    if(!matched){
        return next(appError.create(401 , 'incorrect email or password'));
    }

    const token = await generateToken({email : user.email , _id : user._id});

    user.token = token;

    await user.save();

    res.status(201).json({
        fullName : user.fullName, 
        email : user.email, 
        token : user.token, 
        rooms : user.rooms
    });
});

const register = asyncwrapper(async (req, res, next)=>{
    const {fullName , email , password} = req.body;

    let user = await User.findOne({email : email});
    if(user){
        return next(appError.create(401 , 'user already exist'));
    }

    const hashedPassword = await bcrypt.hash(password ,10);

     user = new User({
        fullName,
        email,
        password : hashedPassword
    });

    await user.save();
    
    const token = await generateToken({email : user.email ,_id : user._id});

    user.token = token;

    await user.save();

    res.status(201).json({fullName , email , token , rooms : user.rooms});
});

const logout = asyncwrapper(async (req, res, next)=>{
res.status(201).json({
    message : 'logout success.',
    token : ''
})
});

const rooms = asyncwrapper(async (req , res , next)=>{
    const rooms = await Room.find({});
    res.status(201).json({data : rooms});
})

module.exports = {
    login,
    register,
    logout,
    rooms
}