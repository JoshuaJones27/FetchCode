module.exports = (app) => {
    // AUTH
    app.route('/auth/signin')
      .post(app.routes.auths.signin);
  
    app.route('/auth/signup')
      .post(app.routes.auths.signup);

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
    app.route('/codigosPostais')
      .all(app.config.passport.authenticate())
      .get(app.routes.codigosPostais.findAll)
      .put(app.routes.codigosPostais.update)
      .delete(app.routes.codigosPostais.remove);
    
    app.route('/codigosPostais/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.codigosPostais.findOne)
      .put(app.routes.codigosPostais.update)
      .delete(app.routes.codigosPostais.remove);
    // RIDE
    app.route('/ride')
      .all(app.config.passport.authenticate())
      .get(app.routes.rides.findAll)
      .post(app.routes.rides.create);
  
    app.route('/ride/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.rides.findOne)
      .put(app.routes.rides.update)
      .delete(app.routes.rides.remove);
  
    app.route('/ride/author/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.rides.findOneAuthor);
  
    app.route('/ride/occupants/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.rides.findOccupants);
  
    app.route('/ride/ammount/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.rides.findAmmount);
  
    app.route('/ride/state/:id')
      .all(app.config.passport.authenticate())
      .put(app.routes.rides.toggleState);
  
    // TRANSACTION
    app.route('/transaction')
      .all(app.config.passport.authenticate())
      .get(app.routes.transactions.findAll)
      .post(app.routes.transactions.create);
  
    app.route('/transaction/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.transactions.findOne)
      .put(app.routes.transactions.update);
  
    app.route('/transaction/author/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.transactions.findUserTransactions);
  
    // VEHICLE
    app.route('/vehicle')
      .all(app.config.passport.authenticate())
      .get(app.routes.vehicles.findAll)
      .post(app.routes.vehicles.create);
  
    app.route('/vehicle/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.vehicles.findOne)
      .delete(app.routes.vehicles.remove)
      .put(app.routes.vehicles.update);
  
    app.route('/vehicle/owner/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.vehicles.findOneOwner);
  
    // OCCUPANTS
    app.route('/occupant')
      .all(app.config.passport.authenticate())
      .get(app.routes.occupants.findAll)
      .post(app.routes.occupants.create);
  
    app.route('/occupant/ride/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.occupants.findOne);
  
    app.route('/occupant/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.occupants.findOne);
  
    app.route('/occupant/:rideID/:userID')
      .all(app.config.passport.authenticate())
      .delete(app.routes.occupants.remove);
  
    // LIST
    app.route('/listed/:page')
      .all(app.config.passport.authenticate())
      .get(app.routes.listeds.findAll);
  
    app.route('/listed/search/:page')
      .all(app.config.passport.authenticate())
      .get(app.routes.listeds.searchOrder);
  
    app.route('/listed/search/word/:type')
      .all(app.config.passport.authenticate())
      .get(app.routes.listeds.searchWord);
  
    // CHAT
    app.route('/chat')
      .all(app.config.passport.authenticate())
      .post(app.routes.chats.create);
  
    app.route('/chat/:rideID/:chatID')
      .all(app.config.passport.authenticate())
      .get(app.routes.chats.findChatMessages);
  
    app.route('/chat/:id')
      .all(app.config.passport.authenticate())
      .get(app.routes.chats.getChatID);
  };
  