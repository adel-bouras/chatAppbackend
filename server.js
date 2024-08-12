require('dotenv').config();
const {server } = require('./src/App');
require("./src/Config/db");
const PORT = process.env.PORT || 8080;


server.listen(PORT , ()=>{
    console.log(`🌍Server is litening on port ${PORT}🌎`);
})