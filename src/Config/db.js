const mongoose = require("mongoose");

const db = mongoose.connect(process.env.DATABASE_URL).then(()=>{
console.log('🔥SUCCESS : server connected to database🔥');
}).catch(()=>{
    console.log('😞FAIL : connecting to database😞');
})

module.exports = db;