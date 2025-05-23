const Joi = require("joi");

const PredictPayloadSchema = Joi.object({
    image: Joi.object({
        hapi: Joi.object({
            headers: Joi.object({
                'content-type': Joi.string().valid('image/jpeg', 'image/png').required(),
            }).unknown(true),
        }).required()
    }).required()
});

module.exports = PredictPayloadSchema;
