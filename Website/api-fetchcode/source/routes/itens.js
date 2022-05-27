const express = require('express');

module.exports = (app) => {
    const router = express.Router();

    router.get('/', (req, res, next) => {
        app.services.item.getAll()
            .then((result) => res.status(200).json(result))
            .catch((err) => next(err));
    });

    // router.get('/color/:id', (req, res, next) => {
    //     app.services.item.findItemByColor( {id: req.params.id} )
    //     .then((result) => res.status(200).json(result))
    //     .catch((err) => next(err));
    // })

    router.get('/:id', (req, res, next) => {
        app.services.item.getAllID({ id: req.params.id })
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
    });

    router.delete('/:id', (req, res, next) => {
        app.services.item.remove({ tipoId: req.params.id })
        .then((result) => res.status(204).json(result))
        .catch((err) => next(err));
    });

    router.post('/', async (req, res, next) => {
        try {
            const result = await app.services.item.create(req.body);
            return res.status(201).json(result[0]);
        } catch (err) {
            return next(err);
        }
    });

    router.put('/:id', (req, res, next) => {
        app.services.item.update(req.params.id, req.body)
          .then((result) => res.status(204).json(result[0]))
          .catch((err) => next(err));
    });
    
    return router;
};