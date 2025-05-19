const authentications = require("../api/authentications");
const users = require("../api/users");
const AuthenticationsService = require("../services/postgres/AuthenticationsService");
const UsersService = require("../services/postgres/UsersService");
const TokenManager = require('../tokenize/TokenManager');
const packageName = require('../validator/users');
const AuthenticationValidator = require('../validator/authentications');

const usersService = new UsersService();
const authService = new AuthenticationsService();

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
            authService,
            usersService,
            tokenManager: TokenManager,
            validator: AuthenticationValidator
        }
    },
];