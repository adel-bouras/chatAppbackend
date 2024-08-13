const Room = require('./../Models/roomModel');
const User = require('./../Models/userModel');

module.exports = (io)=>{
    io.on('connection', (socket) => {
        console.log('a client connected');

        socket.on('join' , async (data)=>{
            try{
                const room = await Room.findById(data.roomId);
                const user = await User.findById(data.userId);
                
                room.users.push(user._id);
                user.rooms.push(room._id);
                
                socket.join(room._id);
                
                io.to(room._id).emit('joined' , `${user.fullName} joined the room`);
                
                await room.save();
                await user.save();
            }catch(e){
                socket.emit('error' , e);
            }
        });
        
        socket.on('message' ,async (data)=>{
            io.to(data.roomId).emit('message' , data.message);
            const room = await Room.findById(data.roomId);
            room.message.push(data.message);
        });

        socket.on('messages' , async (data)=>{
            const room = await Room.findById(data.roomId);
            if(room){
                room.messages = data.messages;
                room.save();
                socket.emit('messages' , {messages : room.message});
            }else{
                console.log('room problem');
            }
        });

        socket.on('onTyping' , (data)=>{
            socket.to(data.roomId).emit('onTyping' , `${data.fullName} is typing ...`);
        });

        socket.on('noTyping' , (data)=>{
            socket.to(data.roomId).emit('noTyping' , '');
        });

        socket.on('create' , async (data)=>{
            const room = new Room({
                admin : data.userId,
                users : [data.userId],
                messages : []
            });
            
            await room.save();
            
            socket.emit('create' , {roomId : room._id});

            const user = await User.findById(data.userId);

            user.rooms.push(room._id);
            
            user.save();
        })
        
        socket.on('disconnect' , (data)=>{
            console.log('user disconnected');

            socket.to(data.roomId).emit('message' , `${data.fullName} has disconnected`);
        })
    });



}