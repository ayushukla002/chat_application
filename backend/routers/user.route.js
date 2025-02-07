const express = require("express")
const {signUp, logIn, logOut} = require("../controllers/user.controller.js")

const router = express.Router()

router.post("/signup", signUp)

router.post("/login", logIn)

router.post("/logout", logOut)


module.exports = router