const express = require('express');
const userController = require('./../Controllers/usercontroller');
const verifyToken = require('./../Utils/verifyToken');

const userRouter = express.Router();

userRouter.post('/login' , userController.login);

userRouter.post('/register' , userController.register);

userRouter.post('/logout' , verifyToken , userController.logout);

userRouter.get('/rooms' , verifyToken , userController.rooms);

userRouter.get('/messages/:_id' , verifyToken , userController.messages);


module.exports = userRouter;