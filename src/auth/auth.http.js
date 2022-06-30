const controllers = require('./auth.controller')
const jwt = require('jsonwebtoken')
const toPromise = require('../tools/toPromise').toPromise
const config = require('../config')
const crypto = require('../tools/crypto')
const schema = require('../tools/verify').schema

const registerUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: 'Invalid Data'
        })
    }
    const hashPassword = crypto.hashPassword(req.body.password)

    const [newUser, err] = await toPromise(controllers.registerNewUser(req.body, hashPassword))
    if (err) {
        return res.status(400).json({
            message: 'Internal Error'
        })
    }

    res.status(201).json(newUser)
}

const loginUser = async (req, res) => {
    const data = schema.validate(req.body)
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Invalid Credentials'
        })
    }

    const [myUser, err] = await toPromise(controllers.getMyUserByEmail(req.body.email))
    if (err || !myUser) {
        return res.status(401).json({
            message: 'Invalid Email'
        })
    }

    const verification = crypto.comparePassword(req.body.password, myUser.password)
    if (!verification) {
        return res.status(401).json({
            message: 'Invalid Password'
        })
    }
    const token = jwt.sign({
        id: myUser.id,
        email: req.body.email
    }, config.jwtSecret)

    res.status(200).json({
        token
    })
};

const generateUrl = (token, userId) => {
    return `/auth/verify-account?token=${token}&user_id${userId}`
};

const generateVerifyToken = (req, res) => {
    //? Esta ruta debe estar dentro de /me/verify-account
    if (!req.user.id) {
        res.status(400).json({
            message: 'Error'
        })
    }
    const id = req.user.id
    const token = controllers.createToken(id)
    res.status(200).json({
        message: 'Confirm your account in the next url',
        url: generateUrl(token, id)
    })
};
const verifyAccount = async (req, res) => {
    //* /auth/verify-account?token=(token)&user_id(userId)
    if (!req.query) {
        res.status(400).json({
            message: 'Missing data'
        })
    } else if (!req.query.token || !req.query.user_id) {
        res.status(400).json({
            message: 'Missing data'
        })
    } else {
        const [verifyToken, err] = await toPromise(controllers.verifyAccount(req.query.token))
        if (err) {
            res.status(400).json({
                message: 'Error'
            })
        }
        if (verifyToken) {
            res.status(200).json({
                message: 'Account verified'
            })
        }
    }
}

        //? Verificar la cuenta de usuario
        //todo: crear ambos controladores para modificar la tabla de usuarios a verificado:true y la tabla de verify_tokens a used:true
        //! Esta ruta no esta protegida, todo es a base del req.query
        //* crear las rutas necesarias para verificar la cuenta


const resetPassword = async (req, res) => {  
    //* /auth/reset-password?email=(email)
    if (!req.query) {
        res.status(400).json({
            message: 'Missing data'
        })
    } else if (!req.query.email) {
        res.status(400).json({
            message: 'Missing data'
        })
    } else {
        const [user, err] = await toPromise(controllers.getMyUserByEmail(req.query.email))
        if (err) {
            res.status(400).json({
                message: 'Error'
            })
        }
        if (user) {
            const token = controllers.resetPassword(req.query.email)
            res.status(200).json({
                message: 'Check your email',
                url: generateUrl(token, user.id)
            })
        }
    }
}


module.exports = {
    registerUser,
    loginUser,
    generateVerifyToken,
    verifyAccount,
    resetPassword

}