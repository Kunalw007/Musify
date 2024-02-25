const express = require("express")
const { signupController, sendotp } = require("../controllers/signup.controller.js")

const router = express.Router()

router.post("/sendotp",sendotp)

router.post("/signup",signupController)

module.exports = router