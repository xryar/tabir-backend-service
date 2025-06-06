const routes = (handler) =>  [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
  {
    method: 'POST',
    path: '/users/{userId}',
    handler: handler.getUserByIdHandler,
  },
];

module.exports = routes;
