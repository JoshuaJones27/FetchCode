const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.cor.getAll()
            .then((result) => res.status(200).json(result))
            .catch((err) => next(err));
    });

    router.post('/create', async (req, res, next) => {
        try {
            const result = await app.services.cores.create(req.body);
            return res.status(201).json(result[0]);
        } catch (err) {
            return next(err);
        }
    });

    router.get('/:id', (req, res, next) => {
        app.services.cor.getAllIdCor({ id: req.params.id })
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    });

    router.delete('/:id', (req, res, next) => {
        app.services.cor.remove(req.params.id)
          .then((result) => res.status(204).json(result[0]))
          .catch((err) => next(err));
    });
    
    return router;
};