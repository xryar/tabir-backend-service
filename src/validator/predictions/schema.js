const Joi = require("joi");

const PredictPayloadSchema = Joi.object({
    image: Joi.any().required().meta({ swaggerType: 'file' }),
});

module.exports = PredictPayloadSchema;
