const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    /**Encontrar um certo pagamento*/
    const findOne = (filter = {}) => {
        return app.db('pagamento').where(filter).select(['id', 'pagamentoTipoID', 'encomendaID']);
    }

    /**Encontrar todos os pagamentos */
    const findAll = async (filter = {}) => {
        return app.db('pagamento').where(filter).select(['id', 'pagamentoTipoID', 'encomendaID']);
    };

    /**Criação do registo de um novo pagamento */
    const create = async (req, res) => {
        if(!req.pagamentoTipoID) throw new ValidationError('O tipo de pagamento é um campo obrigatorio');
        if(!req.encomendaID) throw new ValidationError('A encomenda é um campo obrigatorio');

        const newPagamento = {...req};
        return app.db('pagamento').insert(newPagamento, ['pagamentoTipoID', 'encomendaID']);
    };

    /**Atualizar o pagamento selecionado */
    const update = async (req, res) => {
        const newPagamento = {...req};
        return app.db('pagamento').insert(newPagamento, ['pagamentoTipoID', 'encomendaID']);
    };

    /**Remover um pagamento */
    const remove = async (id) => {
        return app.db('pagamento').where({ id }).del();
    };

    return {
        findOne,
        findAll,
        create,
        update,
        remove,
    };
};

