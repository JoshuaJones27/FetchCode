module.exports = (app) => {
    // AUTH
    app.route('/auth/signin')
      .get(app.routes.utilizadores.getAll);
  
    app.route('/auth/signup')
      .post(app.routes.utilizadores.signup);

    // UTILIZADORES
    app.route('/utilizador')
      .all(app.config.passport.authenticate())
      .get(app.routes.utilizadores.getAll)
      .post(app.routes.utilizadores.create);
  
    app.route('/utilizador/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.utilizadores.findOne)
      .put(app.routes.utilizadores.update)
      .delete(app.routes.utilizadores.remove)
      .patch(app.routes.utilizadores.deactivateAccount);

    // CODIGO POSTAL
    app.route('/codigoPostal')
      .all(app.config.passport.authenticate())
      .get(app.routes.codigosPostais.findAll)
      .delete(app.routes.codigosPostais.remove);

    // COR
    app.route('/cor')
      .all(app.config.passport.authenticate())
      .get(app.routes.cores.findAll)
      .post(app.routes.cores.create)
      .delete(app.routes.cores.remove);

    // ITEM
    app.route('/item')
      .all(app.config.passport.authenticate())
      .get(app.routes.itens.findAll)
      .post(app.routes.itens.create)
      .delete(app.routes.itens.remove);

    // MORADA
    app.route('/morada')
      .all(app.config.passport.authenticate())
      .get(app.routes.moradas.findAll)
      .post(app.routes.moradas.create)
      .delete(app.routes.moradas.delete);
 
    // PAGAMENTO
    app.route('/pagamento')
    .all(app.config.passport.authenticate())
    .get(app.routes.pagamentos.findAll)
    .post(app.routes.pagamentos.create)
    .delete(app.routes.pagamentos.delete);

    // TIPOS ITENS
    app.route('/tipoItem')
    .all(app.config.passport.authenticate())
    .get(app.routes.tipoItens.findAll)
    .post(app.routes.tipoItens.create)
    .delete(app.routes.tipoItens.delete);

    // TRANSPORTES
    app.route('/transporte')
    .all(app.config.passport.authenticate())
    .get(app.routes.transportes.findAll)
    .post(app.routes.transportes.create)
    .delete(app.routes.transportes.delete);
  };
  