const users = require('../database/models/init-models').initModels().users
const uuid = require('uuid')
const generateToken = require('../tools/generateToken')
const verifyToken = require('../database/models/init-models').initModels().verify_tokens

const registerNewUser = async (data, hashPassword) => {
    const id = uuid.v4()
    const newUser = await users.create({
        id,
        ...data,
        password: hashPassword
    })
    return newUser
}

const getMyUserByEmail = async (email) => {
    const myUser = await users.findOne({
        where: {
            email
        }
    })
    return myUser
}

const createToken = async (userId) => {
    const newToken = await verifyToken.create({
        token : generateToken(),
        user_id: userId,
        used: false
    })
    return newToken
}

const resetPassword = async (email) => {
    const user = await getMyUserByEmail(email)
    if (user) {
        const token = createToken(user.id)
        await verifyToken.create(token)
        return token
    }
    return null
}

const verifyAccount = async (token) => {
    const verifyToken = await verifyToken.findOne({
        where: {
            token
        }
    })
    if (verifyToken) {
        await verifyToken.update({
            used: true
        })
        return true
    }
    return false
}




module.exports = {
    registerNewUser,
    getMyUserByEmail,
    createToken,
    verifyAccount,
    resetPassword
}