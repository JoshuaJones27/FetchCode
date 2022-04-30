const ValidationError = require('../errors/validatioError');

module.exports = (app) => {
    const findOne = (filter = {}) => {
        return app.db('tipoitem').where(filter).select(['id', 'tipo']);
    }

    const findAll = async (filter = {}) => {
        return app.db('tipoitem').where(filter).select(['id', 'tipo']);
    };

    const create = async (req, res) => {
        if(!req.tipo) throw new ValidationError('O tipo é um campo obrigatorio');

        const newTipoItem = {...req};
        return app.db('tipoitem').insert(newTipoItem, ['tipo']);
    };

    const update = async (req, res) => {
        console.log(req)

        return app.db('tipoitem').insert([newTipoItem, 'tipo']);
    };

    const remove = async (id) => {
        return app.db('tipoitem').where({ id }).del();
    };

    return {
        findOne,
        findAll,
        create,
        update,
        remove,
    };
};

