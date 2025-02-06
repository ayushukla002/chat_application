const express = require("express")
const connectDb = require("./connectDb")
require("dotenv").config()
const userRoute = require("./routers/user.route.js")
const app = express()
const PORT = process.env.PORT || 3000

connectDb()

app.use(express.json())

app.use("/user", userRoute)

app.get("/", (req, res)=>{
    res.send("hello world")
})

app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`)
})