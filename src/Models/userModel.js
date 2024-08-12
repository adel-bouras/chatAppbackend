const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    token : {
        type : String,
        unique : true
    },
    rooms : {
        type : [mongoose.Schema.Types.ObjectId],
        default : []
    }
});



module.exports = mongoose.model('user' , userSchema);
