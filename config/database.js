const mongoose = require("mongoose")
const logger = require('tracer').colorConsole({});
require("dotenv").config()


const mongoDBConnect = async () => {
    mongoose.connect(process.env.DATABASE_URL, {
    })
    .then(()=>{
        logger.info("Connection with MongoDB is successfull")
        return true;
    })
    .catch((error)=>{
        logger.error("Error while connecting with MongoDB " + error)
        return false;
    })
}
module.exports = mongoDBConnect;