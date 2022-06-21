require('dotenv').config();


module.exports = {
    port : process.env.PORT || 800,
    nodeEnv : process.env.NODE_ENV || 'development'
}