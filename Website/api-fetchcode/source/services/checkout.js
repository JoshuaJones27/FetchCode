const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    // const findOne = (filter = {}) => {
    //     return app.db('item').where(filter).select(['id', 'tipoId', 'tamanho', 'descricao', 'stock', 'imagem']);
    // }

    /**Selecionar todos as compras */
    const getAll = async () => {
        return app.db('compra').select(['*']);
    };

    /**Filtragem apenas as compras por ID */
    const getAllID = async (filter) => {
        return app.db('compra').where(filter).select(['*']);
    };

    //const findItemByColor = 

    /**Criação do registo de uma nova compra */
    const create = async (req, res) => {
        if(!req.nome) throw new ValidationError('O nome é um campo obrigatorio');
        if(!req.email) throw new ValidationError('O email é um campo obrigatorio');
        if(!req.rua) throw new ValidationError('A rua é um campo obrigatorio');
        if(!req.cidade) throw new ValidationError('A cidade é um campo obrigatorio');
        if(!req.distrito) throw new ValidationError('O distrito é um campo obrigatorio');
        if(!req.codPostal) throw new ValidationError('O Codigo Postal é um campo obrigatorio');
        if(!req.nomeCartao) throw new ValidationError('O nome do cartão é um campo obrigatorio');
        if(!req.cartaoCredito) throw new ValidationError('O número do cartão é um campo obrigatorio');
        if(!req.mesValidade) throw new ValidationError('O mes de validade é um campo obrigatorio');
        if(!req.anoValidade) throw new ValidationError('O ano de validade é um campo obrigatorio');
        if(!req.cvv) throw new ValidationError('O CVV é um campo obrigatorio');

        const newCompra = {...req};
        return app.db('compra').insert(newCompra, ['nome', 'email', 'rua', 'cidade', 'distrito', 'codPostal', 'nomeCartao', 'cartaoCredito', 'mesValidade', 'anoValidade', 'cvv']);
    };

    /**Atualizar a compra selecionado */
    const update = async (id, compra) => {
        return app.db('compra').where({ id }).update(compra, ['nome', 'email', 'rua', 'cidade', 'distrito', 'codPostal', 'nomeCartao', 'cartaoCredito', 'mesValidade', 'anoValidade', 'cvv']);
    };

    /**Remover uma compra */
    const remove = async (id) => {
        return app.db('compra').where(id).del();
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

