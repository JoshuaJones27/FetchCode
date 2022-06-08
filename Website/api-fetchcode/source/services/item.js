const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    // const findOne = (filter = {}) => {
    //     return app.db('item').where(filter).select(['id', 'tipoId', 'tamanho', 'descricao', 'stock', 'imagem']);
    // }

    /**Selecionar todos os itens */
    const getAll = async() => {
        return app.db('item').select(['*']);
    };

    /**Filtragem apenas os itens por ID */
    const getAllID = async(filter) => {
        return app.db('item').where(filter).select(['*']);
    };

    //const findItemByColor = 

    /**Criação do registo de um novo item */
    const create = async(req, res) => {
        if (!req.tipoId) throw new ValidationError('O tipo de ID é um campo obrigatorio');
        if (!req.tamanho) throw new ValidationError('O tipo de tamanho é um campo obrigatorio');
        if (!req.descricao) throw new ValidationError('A descrição é um campo obrigatorio');
        if (!req.stock) throw new ValidationError('O stock é um campo obrigatorio');
        if (!req.imagem) throw new ValidationError('A imagem é um campo obrigatorio');

        const newItem = {...req };
        return app.db('item').insert(newItem, ['tipoId', 'tamanho', 'descricao', 'stock', 'imagem', 'tipoItem_id']);
    };

    /**Atualizar o item selecionado */
    const update = (id, item) => {
        return app.db('item').where({ id }).update(item, ['tipoId', 'tamanho', 'descricao', 'stock', 'imagem', 'tipoItem_id']);
    };

    /**Remover um item */
    const remove = async(id) => {
        return app.db('item').where(id).del();
    };

    return {
        // findOne,
        //findItemByColor,
        getAll,
        getAllID,
        create,
        update,
        remove,
    };
};