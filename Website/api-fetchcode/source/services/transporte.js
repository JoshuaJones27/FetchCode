const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    /**Encontrar um certo tipo de transporte*/
    const findOne = (filter = {}) => {
        return app.db('transporte').where(filter).select(['id', 'dataTransporte']);
    }

    /**Selecionar todas os transportes*/
    const getAll = async () => {
        return app.db('transporte').select(['*']);
    };

    /**Criação do registo de um novo transporte */
    const create = async (req, res) => {
        if(!req.dataTransporte) throw new ValidationError('A data do transporte é um campo obrigatorio');

        const newTransporte = {...req};
        return app.db('transporte').insert(newTransporte, ['dataTransporte']);
    };

    /**Atualizar o transporte selecionado */
    const update = async (req, res) => {
        const newTransporte = {...req};
        return app.db('transporte').insert(newTransporte, ['dataTransporte']);
    };

    /**Remover um transporte */
    const remove = async (id) => {
        return app.db('transporte').where({ id }).del();
    };

    return {
        findOne,
        getAll,
        create,
        update,
        remove,
    };
};

