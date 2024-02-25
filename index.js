const express = require("express")
const mongoDBConnect = require("./config/database.js")
const routes = require("./routes/signup.route.js")
const logger = require('tracer').colorConsole({});
require("dotenv").config()



const app = express()
const PORT = process.env.PORT

//Database connection
if(mongoDBConnect() == false) {
    return ;
}
//Body-Parser
app.use(express.json())
//Routes
app.use("/api/auth/",routes)

app.listen(PORT,()=>{
    logger.info(`Server is running at ${PORT}`)
})