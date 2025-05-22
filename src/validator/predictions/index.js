const InvariantError = require("../../exceptions/InvariantError");
const PredictPayloadSchema = require("./schema")

const PredictValidator = {
    validatePredictValidator: (payload) => {
        const validationResult = PredictPayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = PredictValidator;
