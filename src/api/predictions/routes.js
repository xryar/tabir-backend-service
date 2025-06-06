const routes = (handler) => [
  {
    method: 'POST',
    path: '/predictions',
    handler: handler.postPredictionHandler,
    options: {
      auth: 'tabir_jwt',
    }
  },
  {
    method: 'GET',
    path: '/predictions',
    handler: handler.getPredictionsHandler,
    options: {
      auth: 'tabir_jwt',
    }
  },
  {
    method: 'GET',
    path: '/predictions/{id}',
    handler: handler.getPredictionByIdHandler,
    options: {
      auth: 'tabir_jwt',
    }
  },
  {
    method: 'DELETE',
    path: '/predictions/{id}',
    handler: handler.deletePredictionByIdHandler,
    options: {
      auth: 'tabir_jwt',
    }
  },
];

module.exports = routes;
