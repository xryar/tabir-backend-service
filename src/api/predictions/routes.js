const routes = (handler) => [
    {
        method: 'POST',
        path: '/predict',
        handler: handler.postPredictHandler,
        options: {
            payload: {
                output: 'stream',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data',
                maxBytes: 10485760
            }
        }
    }
];

module.exports = routes;
