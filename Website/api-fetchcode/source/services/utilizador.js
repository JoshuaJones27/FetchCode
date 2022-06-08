const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

//const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = (app) => {
  /**Selecionar todos os utilizadores*/
  const getAll = async () => {
    return app.db('utilizador').select(['*']);
  };

  /**Selecionar todos por nome */
  // const getAllName = async () => {
  //   return app.db('utilizador').select(['idUtilizador', 'nome']);
  // };

  const getAllID = async (filter) => {
    return app.db('utilizador').where(filter).select(['*']);
  };

  /**Encontrar um certo utilizador*/
  const findOne = (filter = {}) => {
    return app.db('utilizador').where(filter).select(['idUtilizador', 'nome', 'nomeUtilizador', 'palavraPasse', 'email', 'telemovel', 'rua', 'cidade', 'distrito', 'pais', 'isFuncionario', 'isAdmin', 'token']);
  }

  /**Encriptação de password */
  const getPasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

  /**Criação do registo de um novo utilizador */
  const create = async (req, res) => {
    if (!req.nome) throw new ValidationError('O nome é um campo obrigatorio');
    if (!req.nomeUtilizador) throw new ValidationError('O nome de utilizador é um campo obrigatorio');
    if (!req.palavraPasse) throw new ValidationError('A palavra-passe é um campo obrigatorio');
    if (!req.email) throw new ValidationError('O email é um campo obrigatorio');
    if (!req.telemovel) throw new ValidationError('O número de telemóvel é um campo obrigatorio');
    if (!req.rua) throw new ValidationError('A rua é um campo obrigatorio');
    if (!req.cidade) throw new ValidationError('A cidade é um campo obrigatorio');
    if (!req.distrito) throw new ValidationError('O distrito é um campo obrigatorio');
    if (!req.pais) throw new ValidationError('O pais é um campo obrigatorio');
    //if (!emailRegex.test(req.email)) throw new ValidationError('O email não segue os padrões convencionais!');

    const newUser = { ...req };
    return app.db('utilizador').insert(newUser, ['nome', 'nomeUtilizador', 'palavraPasse', 'email', 'telemovel', 'rua', 'cidade', 'distrito', 'pais', 'isFuncionario', 'isAdmin', 'token']);
  };

  /**Atualizar o utilizador selecionado */
  const update = async (idUtilizador, utilizador) => {
    return app.db('utilizador').where({ idUtilizador }).update(utilizador, ['nome', 'nomeUtilizador', 'palavraPasse', 'email', 'telemovel', 'rua', 'cidade', 'distrito', 'pais', 'isFuncionario', 'isAdmin', 'token']);
  };

  /**Remover um utilizador */
  const remove = async (idUtilizador) => {
    return app.db('utilizador').where({ idUtilizador }).del();
  };

  /**Recuperação de password */
  const forgotPassword = async (req, res) => {
    if (!req.email) throw new ValidationError('O email é um campo obrigatório');
    if (!req.telemovel) throw new ValidationError('O número telemóvel é um campo obrigatório');
    if (!req.palavraPasse) throw new ValidationError('A password é um campo obrigatório');
    if (!req.confirmpassword) throw new ValidationError('A password é um campo obrigatório');
    if (req.palavraPasse !== req.confirmpassword) throw new ValidationError('As password têm que coincidir');
    if (!emailRegex.test(req.email)) throw new ValidationError('O email não segue os padrões convencionais!');
    if (!passwordRegex.test(req.palavraPasse)) throw new ValidationError('A password não segue os padrões convencionais!');
    req.palavraPasse = getPasswordHash(req.palavraPasse);

    const result = await app.db('utilizador').where('email', req.email).first();

    if (result.telemovel == req.telemovel) {
      return app.db('utilizador').where('telemovel', req.telemovel).update('palavraPasse', req.palavraPasse);
    }
    throw new ValidationError('Verifique os seus detalhes!');
  };

  return {
    getAll,
    //getAllName,
    getAllID,
    findOne,
    create,
    update,
    remove,
    forgotPassword,
  };
};
