const InvariantError = require('../../exceptions/InvariantError');
const PredictionsPayloadSchema = require('./schema');

const PredictionsValidator = {
  validatePredictionPayload: (payload) => {
    const validationResult = PredictionsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
};

module.exports = PredictionsValidator;
