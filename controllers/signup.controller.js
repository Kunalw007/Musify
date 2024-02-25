const logger = require('tracer').colorConsole({});
const SignUpModel = require("../models/signup.model.js")
const OTP = require('../models/OTP.js')
const otpGenerator = require('otp-generator')
const bcrypt = require("bcrypt")

exports.sendotp = async (req,res) => {
    try{
        const { emailID } = req.body;
        logger.info(emailID)

        const existingUser = await SignUpModel.findOne({ emailID });
        // If existing user
        if (existingUser) {
            return res.status(400).json({
              success: false,
              message: "User already exists",
            });
        }

        var otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
          });
          logger.info("OTP generated: " + otp)

        const otpBody = await OTP.create({ emailID, otp });
        logger.info(otpBody);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
          });
      
    } catch(error) {
        logger.error("error in searching in database " , error)
        return res.status(500).json({
            status:false,
            message:"Internal Server error " +error
        })
    }
    
}

exports.signupController = async (req, res) => {
    try {
        const { firstName, lastName, emailID, password, otp} = req.body;
        //Most recent OTP 
        const recent = findRecentOTP(emailID,otp)
        if(!(await recent).isOk) {
            logger.info((await recent).err)
            return res.status(400).json({
                status: false,
                message : (await recent).err
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user instance
        const signupData = new SignUpModel({
            firstName,
            lastName,
            emailID,
            password: hashedPassword,
        })

        logger.info(firstName,
            lastName,
            emailID,
            hashedPassword)
        // Save the user to the database
        await signupData.save()

        res.status(201).json({ message: 'User created successfully' });
        logger.info("User created successfully")
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Error Occured : " + error
        })
    }
}

async function findRecentOTP(emailID,otp) {
    try{
        const recentOTP = await OTP.find({ emailID })
        .sort({ createdAt: -1 })
        .limit(1);

        logger.info("RecentOTP is : ",recentOTP)

        if (recentOTP.length === 0 || recentOTP[0].otp !== otp) {
            logger.info("Incorrect OTP")
            return {isOk:false,err:"Invalid OTP or expired"}
        }
        return {isOk:true,err:undefined}

    } catch(error) {
        return {isOk:false,err:error};
    }
}