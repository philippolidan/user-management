const Joi = require("joi");
module.exports = {
    body: Joi.object({
        first_name: Joi
            .string()
            .required()
            .messages({
                'any.required': 'First name is a required field.',
            }),
        last_name: Joi
            .string()
            .required()
            .messages({
                'any.required': 'Last name is a required field.',
            }),
        address: Joi
            .string()
            .required()
            .messages({
                'any.required': 'Address is a required field.',
            }),
        post_code: Joi
            .string()
            .required()
            .messages({
                'any.required': 'Post Code is a required field.',
            }),
        phone_number: Joi
            .string()
            .required()
            .messages({
                'any.required': 'Phone Number is a required field.',
            }),
        email: Joi
            .string()
            .required()
            .messages({
                'any.required': 'Email is a required field.',
            }),
        username: Joi
            .string()
            .required()
            .messages({
                'any.required': 'Username is a required field.',
            }),
        password: Joi
            .string()
            .required()
            .messages({
                'any.required': 'Password is a required field',
            })
    }),
};
