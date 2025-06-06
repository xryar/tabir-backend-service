const authentications = require('../api/authentications');
const users = require('../api/users');
const AuthenticationsService = require('../services/postgres/AuthenticationsService');
const UsersService = require('../services/postgres/UsersService');
const TokenManager = require('../tokenize/TokenManager');
const UsersValidator = require('../validator/users');
const AuthenticationValidator = require('../validator/authentications');

const usersService = new UsersService();
const authenticationsService = new AuthenticationsService();

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
];