const customers_details = require('../database/models/init-models').initModels().customer_details
const customer_addresses = require('../database/models/init-models').initModels().customer_addresses
const uuid = require('uuid')

const createCustomer = async (data, idC) => {
    const id = uuid.v4()
    const newCustomer = await customers_details.create({
        id,
        ...data,
        id_customer: idC

    })
    return newCustomer

}

const getCostumer = async (id) => {
    const costumers = await customers_details.findAll({
        where: {
            id
        }
    })
    return costumers
}

const updateCustomer = async (data, id) => {
    const customer = await customers_details.update({
        ...data
    }, {
        where: {
            id
        }
    })
    if (customer) {
        const customer = await customers_details.findOne({
            where: {
                id
            }
        })
        return customer
    }
    return null
}

const getAlladdresses = async (id) => {
    const addresses = await customer_addresses.findAll({})
    return addresses
}

const getAdressById = async (id) => {
    const address = await customer_addresses.findOne({
        where: {
            id
        }
    }) 
    return address
}

const createAddress = async (data, idC) => {
    const id = uuid.v4()
    const newAddress = await customer_addresses.create({
        id,
        ...data,
        id_customer: idC
    })
    return newAddress
}

const updateAddress = async (data, id) => {
    const customer = await customer_addresses.update({
        ...data
    }, {
        where: {
            id
        }
    })
    if (customer) {
        const customer = await customer_addresses.findOne({
            where: {
                id
            }
        })
        return customer
    }
    return null
}

const deleteAddress = async (id) => {
    const customer = await customer_addresses.destroy({
        where: {
            id
        }
    })
    return customer
}

module.exports = {
    createCustomer,
    getCostumer,
    updateCustomer,
    getAlladdresses,
    getAdressById,
    createAddress,
    updateAddress,
    deleteAddress
}