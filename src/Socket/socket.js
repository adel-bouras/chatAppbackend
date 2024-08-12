const Room = require('./../Models/roomModel');
const User = require('./../Models/userModel');


module.exports = (io)=>{
    io.on('connection', (socket) => {
        socket.on('join', async (roomId) => {
            try {
                const theRoom = await Room.findById(roomId);
                const userId = socket.user._id;
                const user = await User.findById(userId);
                
                if (!theRoom) {
                    return socket.emit('error', 'Room not found');
                }
    
                if (theRoom.users.includes(userId)) {
                    return socket.emit('error', 'User already in the Room');
                }
    
                theRoom.users.push(userId);
                user.rooms.push(roomId);
                
                await user.save();
                await theRoom.save();


    
                socket.join(roomId);
                io.to(roomId).emit('message', `${socket.user.fullName} joined the Room`);
    
            } catch (error) {
                socket.emit('error', 'Failed to join Room');
            }
        });

        socket.on('create' , ()=>{

        })





        socket.on('disconnect', () => {
            socket.emit(`${socket.user.fullName} disconnected.`);
        });

        
    });



}