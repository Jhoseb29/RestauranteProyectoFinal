require('dotenv').config();


module.exports = {
    port : process.env.PORT || 800,
    nodeEnv : process.env.NODE_ENV || 'development',
    jwtSecret : process.env.JWT_SECRET,
    nodeMailer : process.env.NODE_MAILER,
}