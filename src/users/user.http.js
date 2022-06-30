const userControllers = require('./users.controllers');
const { toPromise } = require('../tools/toPromise');
// todo :
//? get /users ADMIN
//? get /users/:id ADMIN
//? delete /users/me CLIENTE salgo yo
//? delete /users/:id ADMIN te elimina
//? put-patch /users/me CLIENTE-USUARIO para modificaciones propias del usuario
//? put-patch /users/:id ADMIN para que el admin pueda modificar cualquier cuenta


//! /auth/login
//! /auth/signup
//! /auth/reset-password
//! /auth/reset-token
//! /auth/verify-account

const createUser = async (req, res) => {
    if(!req.body){
        return res.status(400).json({message: 'Missing data'})
    }
    const [newUser, err] = await toPromise(userControllers.registerUser(req.body))
    if(err){
        return res.status(400).json({message: 'Internal error'})
    }
    res.status(201).json(newUser)
};


const getAllUsers = async (req, res) => {
   
    const users = await userControllers.getAllUsers()
    res.status(200).json(users)
}

const getUserId = async (req, res) => {
    const user = await userControllers.getUserById(req.user.id)
    res.status(200).json(user)
}

const deleteUserByMe = async (req, res) => {
    const user = await userControllers.deleteUser(req.user.id)
    res.status(204).json(user)
}

const deleteUserByAdmin = async (req, res) => {

    const user = await userControllers.deleteUser(req.user.id)
    res.status(204).json(user)
}

const updateUserByMe = async (req, res) => {
    if(!req.user.id){
        return res.status(401).json({message : 'Invalid id'})
    }
    if(req.params.uuid !== req.user.id){
        return res.status(400).json({message: 'Wrong user'})
    }
    if(!req.body){
        return res.status(400).json({message: 'Missing data'})
    }
    const [myUser, err] = await toPromise(userControllers.editUser(req.params.uuid, req.body))
    if(err){
        return res.status(401).json({message: 'Invalid data'})
    }
    res.status(200).json(myUser)
}

const updateUserByAdmin = async (req, res) => {
    if(!req.user.id){
        return res.status(401).json({message : 'Invalid id'})
    }
    if(req.params.uuid !== req.user.id){
        return res.status(400).json({message: 'Wrong user'})
    }
    if(!req.body){
        return res.status(400).json({message: 'Missing data'})
    }
    const [myUser, err] = await toPromise(userControllers.editUser(req.params.uuid, req.body))
    if(err){
        return res.status(401).json({message: 'Invalid data'})
    }
    res.status(200).json(myUser)
}

module.exports = {
    getAllUsers,
    getUserId,
    deleteUserByMe,
    deleteUserByAdmin,
    updateUserByMe,
    updateUserByAdmin,
    createUser
}