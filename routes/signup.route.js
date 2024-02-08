const express = require("express")
const { signupController } = require("../controllers/signup.controller.js")

const router = express.Router()

router.post("/sign-up",signupController)

module.exports = router