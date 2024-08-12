const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    admin : {
       type : mongoose.Schema.Types.ObjectId,
       required : true
    },
    users : {
        type : [mongoose.Schema.Types.ObjectId],
        default : []
    },
    messages : {
        type : [String],
        default : []
    }
});



module.exports = mongoose.model('room' , roomSchema);
