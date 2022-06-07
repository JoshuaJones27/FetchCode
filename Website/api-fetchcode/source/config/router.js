const express = require('express');

module.exports = (app) => {
  app.use('/auth', app.routes.utilizadores);

  const secureRouter = express.Router();

  secureRouter.use('/utilizador', app.routes.utilizadores);
  secureRouter.use('/codigoPostal', app.routes.codigosPostais);
  secureRouter.use('/cor', app.routes.cores);
  secureRouter.use('/encomenda', app.routes.encomendas);
  secureRouter.use('/item', app.routes.itens);
  secureRouter.use('/morada', app.routes.moradas);
  secureRouter.use('/pagamento', app.routes.pagamentos);
  secureRouter.use('/tipoItem', app.routes.tiposItens);
  secureRouter.use('/transporte', app.routes.transportes);
  secureRouter.use('/compra', app.routes.checkouts);

  app.use('/v1', secureRouter);
};
