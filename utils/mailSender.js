const logger = require('tracer').colorConsole({});
const transporter = require("../config/mail.js")
require("dotenv").config()

const sendOTPMail = async (email, title, body) => {
    try{
        if(transporter == undefined){
            logger.error("transporter undefined")
            return false
        }
        let info = await transporter.sendMail({
            from:'Musify',
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        logger.info(info)

    }catch(error) {
        logger.error(error)
        return false
    }
    return true
}

module.exports = sendOTPMail