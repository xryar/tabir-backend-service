const authentications = require("../api/authentications");
const users = require("../api/users");
const AuthenticationsService = require("../services/postgres/AuthenticationsService");
const PredictionsService = require("../services/postgres/PredictionsService");
const UsersService = require("../services/postgres/UsersService");
const TokenManager = require('../tokenize/TokenManager');
const UsersValidator = require('../validator/users');
const AuthenticationValidator = require('../validator/authentications');
const PredictionValidator = require('../validator/predictions');
const predictions = require("../api/predictions");

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
        validator: PredictionValidator,
      }
    }
];