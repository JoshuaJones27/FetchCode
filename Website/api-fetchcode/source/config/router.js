const express = require('express');

module.exports = (app) => {
  // app.use('/auth', app.routes.auths);

  const secureRouter = express.Router();

  secureRouter.use('/utilizador', app.routes.utilizadores);
  

  app.use(secureRouter);
};
