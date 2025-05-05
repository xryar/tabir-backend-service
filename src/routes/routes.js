const login = require("../handler/loginHandler");
const register = require("../handler/registerHandler");

const routes = [
    {
        method: 'POST',
        path: '/login',
        handler: login
    },
    {
        method: 'POST',
        path: '/register',
        handler: register
    },
];

module.exports = routes;