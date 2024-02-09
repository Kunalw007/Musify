const mongoose = require("mongoose")
require("dotenv").config()


const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("Database Connection successfull")
    return true;
    })
    .catch((error)=>{
        console.log("Issues in DB connection")
        console.log(error.message)
        return false;
    })
}
module.exports = dbConnect;