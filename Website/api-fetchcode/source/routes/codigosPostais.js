const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.codigoPostal.getAll()
            .then((result) => res.status(200).json(result))
            .catch((err) => next(err));
    });

    router.post('/create', async (req, res, next) => {
        try {
            const result = await app.services.codigoPostal.create(req.body);
            return res.status(201).json(result[0]);
        } catch (err) {
            return next(err);
        }
    });

    router.delete('/:id', (req, res, next) => {
        app.services.codigoPostal.update(req.params.id, req.body)
          .then((result) => res.status(204).json(result[0]))
          .catch((err) => next(err));
    });
    
    return router;
};