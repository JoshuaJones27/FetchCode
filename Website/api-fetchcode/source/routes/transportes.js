const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.transporte.getAll()
            .then((result) => res.status(200).json(result))
            .catch((err) => next(err));
    });

    router.get('/:id', (req, res, next) => {
        app.services.transporte.findOne({ id: req.params.id })
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    });

    router.post('/', async (req, res, next) => {
        try {
            const result = await app.services.transporte.create(req.body);
            return res.status(201).json(result[0]);
        } catch (err) {
            return next(err);
        }
    });

    router.put('/:id', (req, res, next) => {
        app.services.transporte.update(req.params.id, req.body)
          .then((result) => res.status(204).json(result[0]))
          .catch((err) => next(err));
    });

    router.delete('/:id', (req, res, next) => {
        app.services.transporte.remove(req.params.id)
          .then((result) => res.status(204).json(result[0]))
          .catch((err) => next(err));
    });
    
    return router;
};