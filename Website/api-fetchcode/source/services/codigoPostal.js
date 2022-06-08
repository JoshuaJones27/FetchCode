const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    // const findOne = (filter= {}) => {
    //     return app.db('codigopostal').where(filter).select(['id', 'codPostal']);
    // };

    /**Selecionar todos os códigos postais */
    const getAll = async () => {
        return app.db('codigopostal').select(['*']);
    };

    /**Filtragem  de apenas dos codigos postais */
    const getAllCodPost = async (filter) => {
        return app.db('codigopostal').where(filter).select(['*']);
    };
    
    /**Criação do registo de um novo código postal*/ 
    const create = async (req, res) => {
        if(!req.codPostal) throw new ValidationError('O Codigo Postal é um campo obrigatorio');

        const newCodigopostal = {...req};
        return app.db('codigopostal').insert(newCodigopostal, ['codPostal']);
    };

    /**Atualizar para um novo código postal */
    const update = async (id, codPostal) => {
        return app.db('codigopostal').where({ id }).update(codPostal, ['codPostal']);
    };

    /**Remover um código postal */
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