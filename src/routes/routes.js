const login = require("../handler/loginHandler");
const register = require("../handler/registerHandler");

const routes = [
    {
        method: 'POST',
        path: '/login',
        handler: register
    },
    {
        method: 'POST',
        path: '/register',
        handler: login
    },
];

module.exports = routes;