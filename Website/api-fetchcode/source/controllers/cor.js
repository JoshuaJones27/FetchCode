const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    const findOne = (filter= {}) => {
        return app.db('cor').where(filter).select(['id', 'cor']);
    };

    const findAll = async (filter= {}) => {
        return app.db('cor').where(filter).select(['id', 'cor']);
    };

    const create = async (req, res) => {
        if(!req.cor) throw new ValidationError('A cor é um campo obrigatorio');

        const newCor = {...req};
        return app.db('cor').insert(newCor, ['cor']);
    };

    const update = async (req, res) => {
        console.log(req)

        return app.db('cor').insert([newCor, 'cor']);
    };

    const remove = async (id) => {
        return app.db('cor').where({ id }).del();
    };

    return {
        findOne,
        findAll,
        create,
        update,
        remove,
    };
};