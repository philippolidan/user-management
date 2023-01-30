const Joi = require("joi");
module.exports = {
    body: Joi.object({
        ids: Joi
            .array()
            .required()
            .messages({
                'any.required': 'ID(s) are required field.',
            })
    }),
};
