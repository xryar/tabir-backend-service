/* eslint-disable camelcase */
const Joi = require('joi');

const PredictionsPayloadSchema = Joi.object({
  user_id: Joi.string().required(),
  prediction: Joi.string().min(1).required(),
  created_at: Joi.string().required(),
});

module.exports = PredictionsPayloadSchema;
