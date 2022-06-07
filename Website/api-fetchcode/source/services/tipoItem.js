const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    /**Encontrar um certo tipo de item*/
    const findOne = (filter = {}) => {
        return app.db('tipoitem').where(filter).select(['id', 'tipo']);
    }

    /**Encontrar todos os tipos de item */
    const findAll = async (filter = {}) => {
        return app.db('tipoitem').where(filter).select(['id', 'tipo']);
    };

    /**Criação de um novo tipo de item */
    const create = async (req, res) => {
        if(!req.tipo) throw new ValidationError('O tipo é um campo obrigatorio');

        const newTipoItem = {...req};
        return app.db('tipoitem').insert(newTipoItem, ['tipo']);
    };

    /**Atualizar o tipo de item selecionado */
    const update = async (req, res) => {
        const newTipoItem = {...req};
        return app.db('tipoitem').insert(newTipoItem, ['tipo']);
    };

    /**Remover um tipo de item */
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

