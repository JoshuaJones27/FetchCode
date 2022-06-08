const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    /**Encontrar uma certa encomenda */
    const findOne = (filter= {}) => {
        return app.db('encomenda').where(filter).select(['idEncomenda', 'encomendaDescricao', 'estado', 'Transporte_id', 'Pagamento_id', 'Utilizador_idUtilizador']);
    };

    /**Selecionar todas as encomendas */
    const getAll = async () => {
        return app.db('encomenda').select(['*']);
    };

    /**Criação do registo de uma nova encomenda */
    const create = async (req, res) => {
        if(!req.encomendaDescricao) throw new ValidationError('A descrição da encomenda é um campo obrigatorio');
        if(!req.estado) throw new ValidationError('O estado da encomenda é um campo obrigatorio');

        const newEncomenda = {...req};
        return app.db('encomenda').insert(newEncomenda, ['encomendaDescricao', 'estado', 'Transporte_id', 'Pagamento_id', 'Utilizador_idUtilizador']);
    };

    /**Atualizar a encomenda selecionada */
    const update = async (idEncomenda, encomenda) => {
        return app.db('encomenda').where({ idEncomenda }).update(encomenda, ['encomendaDescricao', 'estado', 'Transporte_id', 'Pagamento_id', 'Utilizador_idUtilizador']);
    };

    /**Remover uma encomenda */
    const remove = async (idEncomenda) => {
        return app.db('encomenda').where({ idEncomenda }).del();
    };

    return {
        findOne,
        getAll,
        create,
        update,
        remove,
    };
};