const mongoose = require('mongoose')
const sendOTPMail = require('../utils/mailSender.js');
const otpTemplate = require('../mail/template/emailVerification.js')
const logger = require('tracer').colorConsole({});

const otpSchema = mongoose.Schema({
    emailID:{
        type:String,
        required: true,
    },
    otp:{
        type : String,
        required : true
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        expires: 5*60,
    }
})

async function sendVerificationMail(email,otp){
    try{
        let isOk = sendOTPMail(email,"Verification OTP from Musify",otpTemplate(otp));
        if(!isOk) {
            return false
        }
    } catch(error) {
        logger.error("Error while sending mail "+ error)
        return false
    }
    return true
}


otpSchema.pre("save", async function() {
    let isOk = await sendVerificationMail(this.emailID,this.otp);
    if(!isOk) {
        logger.error("Mail not sent")
    }
})

module.exports = mongoose.model("OTP",otpSchema)