const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    /**Encontrar uma certa morada */
    const findOne = (filter = {}) => {
        return app.db('morada').where(filter).select(['id', 'rua', 'cidade', 'distrito', 'pais', 'CodigoPostal_id']);
    }

    /**Selecionar todas as moradas*/
    const getAll = async () => {
        return app.db('morada').select(['*']);
    };

    /**Criação do registo de uma nova morada */
    const create = async (req, res) => {
        if(!req.rua) throw new ValidationError('A rua é um campo obrigatorio');
        if(!req.cidade) throw new ValidationError('A cidade é um campo obrigatorio');
        if(!req.distrito) throw new ValidationError('O distrito é um campo obrigatorio');
        if(!req.pais) throw new ValidationError('O pais é um campo obrigatorio');

        const newMorada = {...req};
        return app.db('morada').insert(newMorada, ['rua', 'cidade', 'distrito', 'pais', 'CodigoPostal_id']);
    };

    /**Atualizar a morada selecionada */
    const update = async (id, morada) => {
        return app.db('morada').where( {id} ).update(morada, ['rua', 'cidade', 'distrito', 'pais', 'CodigoPostal_id']);
    };

    /**Remover uma morada */
    const remove = async (id) => {
        return app.db('morada').where(id).del();
    };

    return {
        findOne,
        getAll,
        create,
        update,
        remove,
    };
};

