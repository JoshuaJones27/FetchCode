module.exports = (app) => {
    // AUTH
    app.route('/auth/signin')
      .get(app.routes.utilizadores.getAll);
  
    app.route('/auth/signup')
      .post(app.routes.utilizadores.signup);

    app.route('/auth/forget-password')
      .put(app.routes.users.forgotPassword());

    // UTILIZADORES
    app.route('/utilizador')
      .all(app.config.passport.authenticate())
      .get(app.routes.utilizadores.getAll)
      .get(app.routes.utilizadores.getAllName)
      .post(app.routes.utilizadores.create);
  
    app.route('/utilizador/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.utilizadores.findOne)
      .put(app.routes.utilizadores.update)
      .delete(app.routes.utilizadores.remove)

    // CODIGO POSTAL
    app.route('/codigoPostal')
      .all(app.config.passport.authenticate())
      .get(app.routes.codigosPostais.getAll)
      .post(app.routes.codigosPostais.create)
      .delete(app.routes.codigosPostais.remove);

    app.route('/codigoPostal/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.codigosPostais.getAllCodPost)
      .post(app.routes.codigosPostais.create)
      .delete(app.routes.codigosPostais.remove);

    // COR
    app.route('/cor')
      .all(app.config.passport.authenticate())
      .get(app.routes.cores.getAll)
      .post(app.routes.cores.create)
      .delete(app.routes.cores.remove);

    app.route('/cor/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.cores.getAllIdCor)
      .post(app.routes.cores.create)
      .delete(app.routes.cores.remove);    

    // ITEM
    app.route('/item')
      .all(app.config.passport.authenticate())
      .get(app.routes.itens.getAll)
      .post(app.routes.itens.create)

    app.route('/item/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.itens.getAll)
      .post(app.routes.itens.create)
      .delete(app.routes.itens.remove);
    
    // MORADA
    app.route('/morada')
      .all(app.config.passport.authenticate())
      .get(app.routes.moradas.getAll)
      .post(app.routes.moradas.create)
      .delete(app.routes.moradas.remove);
 
    app.route('/morada/:id')
     .all(app.config.passport.authenticate())
     .get(app.routes.moradas.getAll)
     .post(app.routes.moradas.create)
     .delete(app.routes.moradas.remove);  

    // PAGAMENTO
    app.route('/pagamento')
    .all(app.config.passport.authenticate())
    .get(app.routes.pagamentos.getAll)
    .post(app.routes.pagamentos.create)
    .delete(app.routes.pagamentos.remove);

    app.route('/pagamento/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.pagamentos.getAll)
    .post(app.routes.pagamentos.create)
    .delete(app.routes.pagamentos.remove);

    // TIPOS ITENS
    app.route('/tipoItem')
    .all(app.config.passport.authenticate())
    .get(app.routes.tipoItens.getAll)
    .post(app.routes.tipoItens.create)
    .delete(app.routes.tipoItens.remove);

    app.route('/tipoItem/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.tipoItens.getAll)
    .post(app.routes.tipoItens.create)
    .delete(app.routes.tipoItens.remove);
    
    // TRANSPORTES
    app.route('/transporte')
    .all(app.config.passport.authenticate())
    .get(app.routes.transportes.getAll)
    .post(app.routes.transportes.create)
    .delete(app.routes.transportes.remove);

    app.route('/transporte/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.transportes.getAll)
    .post(app.routes.transportes.create)
    .delete(app.routes.transportes.remove); 

    // ENCOMENDA
    app.route('/encomenda')
    .all(app.config.passport.authenticate())
    .get(app.routes.encomendas.getAll)
    .post(app.routes.encomendas.create)
    .delete(app.routes.encomendas.remove);

    app.route('/encomenda/:id')
    .all(app.config.passport.authenticate())
    .get(app.routes.encomendas.getAll)
    .post(app.routes.encomendas.create)
    .delete(app.routes.encomendas.remove); 
  };