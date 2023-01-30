const Joi = require("joi");
module.exports = {
    body: Joi.object({
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
