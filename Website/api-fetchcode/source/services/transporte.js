const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    // const findOne = (filter = {}) => {
    //     return app.db('transporte').where(filter).select(['id', 'dataTransporte']);
    // }

    const getAll = async () => {
        return app.db('transporte').select(['*']);
    };

    const create = async (req, res) => {
        if(!req.dataTransporte) throw new ValidationError('A data do transporte é um campo obrigatorio');

        const newTransporte = {...req};
        return app.db('transporte').insert(newTransporte, ['dataTransporte']);
    };

    const update = async (req, res) => {
        console.log(req)

        return app.db('transporte').insert([newTransporte, 'dataTransporte']);
    };

    const remove = async (id) => {
        return app.db('transporte').where({ id }).del();
    };

    return {
        // findOne,
        getAll,
        create,
        update,
        remove,
    };
};

