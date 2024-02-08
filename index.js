const express = require("express")
const dbConnect = require("./config/database.js")
const routes = require("./routes/signup.route.js")
require("dotenv").config()

const app = express()

if(dbConnect() == false) {
    return ;
}
app.use(express.json())

app.use("/api/auth/",routes)

const port = process.env.PORT

app.listen(3000,()=>{
    console.log(`Server is running at ${port}`)
})