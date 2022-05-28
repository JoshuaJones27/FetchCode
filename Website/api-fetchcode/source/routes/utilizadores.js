const express = require('express');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

const secret = '123';

module.exports = (app) => {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    app.services.utilizador.getAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/', (req, res, next) => {
    app.services.utilizador.getAllName()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  });

  router.get('/:id', (req, res, next) => {
    app.services.utilizador.findOne({ id: req.params.id })
    .then((result) => res.status(200).json(result))
    .catch((err) => next(err));
});

  router.post('/signin', (req, res, next) => {
    app.services.utilizador.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) throw new ValidationError('Autenticação inválida! #2');

        const {
          id, email, telemovel,
        } = user;

        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id,
            email,
            telemovel,
          };

          const token = jwt.encode(payload, secret);
          res.status(200).json({ token });
        } else throw new ValidationError('Autenticação inválida!');
      }).catch((err) => next(err));
  });

  router.put('/:id', (req, res, next) => {
    app.services.utilizador.update(req.params.id, req.body)
      .then((result) => res.status(204).json(result[0]))
      .catch((err) => next(err));
  });

  router.post('/signup', async (req, res, next) => {
    try {
      const result = await app.services.utilizador.create(req.body);
      return res.status(201).json(result[0]);
    } catch (err) {
      return next(err);
    }
  });

  router.delete('/:id', (req, res, next) => {
    app.services.utilizador.remove(req.params.id)
      .then((result) => res.status(204).json(result[0]))
      .catch((err) => next(err));
});

  return router;
};
