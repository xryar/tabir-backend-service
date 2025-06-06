const PredicitonsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'predictions',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const predictionsHandler = new PredicitonsHandler(service, validator);
    server.route(routes(predictionsHandler));
  }
};