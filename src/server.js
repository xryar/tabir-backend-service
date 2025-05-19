require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes)

    await server.start();
    console.log(`Server Running in ${server.info.uri}`);
};

init();