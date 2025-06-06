const authentications = require('../api/authentications');
const users = require('../api/users');
const AuthenticationsService = require('../services/postgres/AuthenticationsService');
const UsersService = require('../services/postgres/UsersService');
const TokenManager = require('../tokenize/TokenManager');
const UsersValidator = require('../validator/users');
const PredictionsValidator = require('../validator/predictions');
const AuthenticationValidator = require('../validator/authentications');
const predictions = require('../api/predictions');
const PredictionsService = require('../services/postgres/PredictionsService');

const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();
const predictionsService = new PredictionsService();

module.exports = [
  {
    plugin: users,
    options: {
      service: usersService,
      validator: UsersValidator,
    }
  },
  {
    plugin: authentications,
    options: {
      authenticationsService,
      usersService,
      tokenManager: TokenManager,
      validator: AuthenticationValidator
    }
  },
  {
    plugin: predictions,
    options: {
      service: predictionsService,
      validator: PredictionsValidator,
    }
  }
];