const express = require( "express");
const cors = require( 'cors');
const { Server } = require( "socket.io");
const { createServer } = require( "node:http");
const userRouter = require("./Routes/userRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/users' , userRouter);

app.all('*' , (req , res)=>{
    res.status(404).json({message : 'URL not found😥'})
});

app.use((err, req, res , next)=>{
    res.status(err.status || 500).json({message : err.message || 'Something broke!'});
});


const server = createServer(app);

const io = new Server(server ,{
    cors : {
        origin : 'http://localhost:5173',
    }
});

require('./Socket/socket')(io);

module.exports = {server};