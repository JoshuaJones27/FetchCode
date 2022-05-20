const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    const findOne = (filter = {}) => {
        return app.db('pagamento').where(filter).select(['id', 'pagamentoTipoID', 'encomendaID']);
    }

    const findAll = async (filter = {}) => {
        return app.db('pagamento').where(filter).select(['id', 'pagamentoTipoID', 'encomendaID']);
    };

    const create = async (req, res) => {
        if(!req.pagamentoTipoID) throw new ValidationError('O tipo de pagamento é um campo obrigatorio');
        if(!req.encomendaID) throw new ValidationError('A encomenda é um campo obrigatorio');

        const newPagamento = {...req};
        return app.db('pagamento').insert(newPagamento, ['pagamentoTipoID', 'encomendaID']);
    };

    const update = async (req, res) => {
        console.log(req)

        return app.db('pagamento').insert([newPagamento, 'pagamentoTipoID', 'encomendaID']);
    };

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

