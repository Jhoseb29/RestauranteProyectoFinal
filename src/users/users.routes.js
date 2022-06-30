const router = require('express').Router()
const userHttpHandler = require('./user.http')
const passport = require('passport')
const config = require('../config')
require('../tools/auth')(passport)

router.route('/')
    .get(userHttpHandler.getAllUsers)
    .post(userHttpHandler.createUser)

router.route('/:id')
    .get(passport.authenticate('jwt', config.jwtSecret), userHttpHandler.getUserId)
    .delete(passport.authenticate('jwt', config.jwtSecret), userHttpHandler.deleteUserByAdmin)
    .put(passport.authenticate('jwt', config.jwtSecret), userHttpHandler.updateUserByAdmin)


router.route('/me')
    .delete(passport.authenticate('jwt', config.jwtSecret), userHttpHandler.deleteUserByMe)
    .put(passport.authenticate('jwt', config.jwtSecret), userHttpHandler.updateUserByMe)

module.exports = {
    router
}