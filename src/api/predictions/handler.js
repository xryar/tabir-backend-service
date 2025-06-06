const autoBind = require('auto-bind');

class PredicitonsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postPredictionHandler(request, h) {
    this._validator.validatePredictionPayload(request.payload);
    const { prediction } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const predictionId = await this._service.addPrediction({ prediction, userId: credentialId });

    const response = h.response({
      status: 'success',
      message: 'Prediksi berhasil ditambahkan',
      data: {
        predictionId,
      },
    });
    response.code(201);
    return response;
  }

  async getPredictionsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const predictions = await this._service.getPredictionsByUserId(credentialId);

    return h.response({
      status: 'success',
      data: {
        predictions
      }
    });
  }

  async getPredictionByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPredictionAccess(id, credentialId);
    const prediction = await this._service.getPredictionById(id);
    return h.response({
      status: 'success',
      data: {
        prediction,
      },
    });
  }

  async deletePredictionByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPredictionAccess(id, credentialId);
    await this._service.deletePredictionById(id);

    return h.response({
      status: 'success',
      message: 'Prediksi berhasil dihapus',
    });
  }
}

module.exports = PredicitonsHandler;
