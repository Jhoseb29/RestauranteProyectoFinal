const custumerController = require('./customers.controllers');

const getCustomerById = async (req, res) => {
    const Coustomer_details = await custumerController.getCostumer();
    res.status(200).json(Coustomer_details);
}

const createCustomer = async (req, res) => {
    const newCustomer = await custumerController.createCustomer();
    res.status(201).json(newCustomer);
}

const updateCustomer = async (req, res) => {
    const updatedCustomer = await custumerController.updateCustomer();
    res.status(200).json(updatedCustomer);
}

const getAlladdresses = async (req, res) => {
    const addresses = await custumerController.getAlladdresses();
    res.status(200).json(addresses);
}

const getAdressById = async (req, res) => {
    const address = await custumerController.getAdressById();
    res.status(200).json(address);
}

const createAddress = async (req, res) => {
    const newAddress = await custumerController.createAddress();
    res.status(201).json(newAddress);
} 

const updateAddress = async (req, res) => {
    const updatedAddress = await custumerController.updateAddress();
    res.status(200).json(updatedAddress);
}

const deleteAddress = async (req, res) => {
    const deletedAddress = await custumerController.deleteAddress();
    res.status(202).json(deletedAddress);
}

module.exports = {
    getCustomerById,
    createCustomer,
    updateCustomer,
    getAlladdresses,
    getAdressById,
    createAddress,
    deleteAddress,
    updateAddress
}


