const router = require('express').Router();
const passport = require('passport');
require('../tools/auth')(passport);
const http = require('./customers.http');

router.route('/:uuid/customer')
    .get(http.getCustomerById)
    .post(http.createCustomer)

router.route('/:uuid') 
    .put(http.updateCustomer)
    
router.route('/:uuid/addresses')
    .get(http.getAlladdresses)
    .post(http.createAddress)
    
router.route('/:uuid/addresses/:uuid')
    .get(http.getAdressById)
    .put(http.updateAddress)
    .delete(http.deleteAddress)

    
 exports.router = router;