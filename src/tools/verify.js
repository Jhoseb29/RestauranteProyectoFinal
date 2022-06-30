const joi = require('joi');

const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(15).required()
})

console.log(schema.validate({
    email: 'xjhoseb@gmail.com',
    password: '12345678'

}))

module.exports = {
    schema
}