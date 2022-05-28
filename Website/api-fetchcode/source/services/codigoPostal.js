const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    // const findOne = (filter= {}) => {
    //     return app.db('codigopostal').where(filter).select(['id', 'codPostal']);
    // };

    const getAll = async () => {
        return app.db('codigopostal').select(['*']);
    };

    const getAllCodPost = async (filter) => {
        return app.db('codigopostal').where(filter).select(['*']);
    };

    const create = async (req, res) => {
        if(!req.codPostal) throw new ValidationError('O Codigo Postal é um campo obrigatorio');

        const newCodigopostal = {...req};
        return app.db('codigopostal').insert(newCodigopostal, ['codPostal']);
    };

    const update = async (req, res) => {
        console.log(req)
        return app.db('codigopostal').insert([newCodigopostal, 'codPostal']);
};

    const remove = async (id) => {
        return app.db('codigopostal').where({ id }).del();
    };

    return {
        // findOne,
        getAll,
        getAllCodPost,
        create,
        update,
        remove,
    };
};