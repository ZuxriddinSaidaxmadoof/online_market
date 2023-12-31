const joi = require("joi");

const userchema = joi.object({
    phone: joi.number().min(9).required(),
    password: joi.string().min(4).required(),
    fullName: joi.string().min(4).required(),
})
const loginSchema = joi.object({
    phone: joi.number().min(9).required(),
    password: joi.string().min(4).required()
})


module.exports = {userchema, loginSchema};