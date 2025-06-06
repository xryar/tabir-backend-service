/* eslint-disable camelcase */
const Joi = require('joi');

const PredictionsPayloadSchema = Joi.object({
  prediction: Joi.string().min(1).required(),
});

module.exports = PredictionsPayloadSchema;
