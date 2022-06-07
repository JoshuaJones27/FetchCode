const ValidationError = require('../errors/validationError');

module.exports = (app) => {
    const findOne = (filter = {}) => {
        return app.db('morada').where(filter).select(['id', 'rua', 'cidade', 'distrito', 'pais', 'CodigoPostal_id']);
    }

    const getAll = async () => {
        return app.db('morada').select(['*']);
    };

    const create = async (req, res) => {
        if(!req.rua) throw new ValidationError('A rua é um campo obrigatorio');
        if(!req.cidade) throw new ValidationError('A cidade é um campo obrigatorio');
        if(!req.distrito) throw new ValidationError('O distrito é um campo obrigatorio');
        if(!req.pais) throw new ValidationError('O pais é um campo obrigatorio');

        const newMorada = {...res};
        console.log(['rua', 'cidade', 'distrito', 'pais', 'CodigoPostal_id']);
        return app.db('morada').insert(newMorada, ['rua', 'cidade', 'distrito', 'pais', 'CodigoPostal_id']);
    };

    const update = async (id) => {
        //return app.db('morada').insert([newMorada, 'rua', 'cidade', 'distrito', 'pais', 'CodigoPostal_id']);
        return app.db('morada').where( {id} ).insert(['rua', 'cidade', 'distrito', 'pais', 'CodigoPostal_id']);
    };

    const remove = async (id) => {
        return app.db('morada').where({ id }).del();
    };

    return {
        findOne,
        getAll,
        create,
        update,
        remove,
    };
};

