const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    const findOne = (filter= {}) => {
        return app.db('encomenda').where(filter).select(['idEncomenda', 'encomendaDescricao', 'estado', 'Transporte_id', 'Pagamento_id', 'Utilizador_idUtilizador']);
    };

    const getAll = async () => {
        return app.db('encomenda').select(['*']);
    };

    const create = async (req, res) => {
        if(!req.encomendaDescricao) throw new ValidationError('A descrição da encomenda é um campo obrigatorio');
        if(!req.estado) throw new ValidationError('O estado da encomenda é um campo obrigatorio');

        const newEncomenda = {...req};
        return app.db('encomenda').insert(newEncomenda, ['encomendaDescricao', 'estado', 'Transporte_id', 'Pagamento_id', 'Utilizador_idUtilizador']);
    };

    const update = async (req, res) => {
        console.log(req)

        return app.db('encomenda').insert([newEncomenda, 'encomendaDescricao', 'estado', 'Transporte_id', 'Pagamento_id', 'Utilizador_idUtilizador']);
    };

    const remove = async (id) => {
        return app.db('encomenda').where({ id }).del();
    };

    return {
        findOne,
        getAll,
        create,
        update,
        remove,
    };
};