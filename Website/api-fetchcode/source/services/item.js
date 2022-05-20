const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    const findOne = (filter = {}) => {
        return app.db('item').where(filter).select(['id', 'tipoId', 'tamanho', 'descricao', 'stock', 'imagem']);
    }

    const findAll = async (filter = {}) => {
        return app.db('item').where(filter).select(['id', 'tipoId', 'tamanho', 'descricao', 'stock', 'imagem']);
    };

    const create = async (req, res) => {
        if(!req.tipoId) throw new ValidationError('O tipo de ID é um campo obrigatorio');
        if(!req.tamanho) throw new ValidationError('O tipo de tamanho é um campo obrigatorio');
        if(!req.descricao) throw new ValidationError('A descrição é um campo obrigatorio');
        if(!req.stock) throw new ValidationError('O stock é um campo obrigatorio');
        if(!req.imagem) throw new ValidationError('A imagem é um campo obrigatorio');

        const newItem = {...req};
        return app.db('item').insert(newItem, ['tipoId', 'tamanho', 'descricao', 'stock', 'imagem']);
    };

    const update = async (req, res) => {
        console.log(req)

        return app.db('item').insert([newItem, 'tipoId', 'tamanho', 'descricao', 'stock', 'imagem']);
    };

    const remove = async (id) => {
        return app.db('item').where({ id }).del();
    };

    return {
        findOne,
        findAll,
        create,
        update,
        remove,
    };
};

