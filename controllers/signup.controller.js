const signupModel = require("../models/signup.model.js")
const bcrypt = require("bcrypt")

exports.signupController = async (req, res) => {
    try {
        const { firstName, lastName, emailID, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance
        const signupData = new signupModel({
            firstName,
            lastName,
            emailID,
            password: hashedPassword,
        })

        // Save the user to the database
        await signupData.save()

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.json({ Message: "Data not inserted successfully : " + error })
    }
}