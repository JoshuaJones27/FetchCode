// const bcrypt = require('bcrypt')

// function registerUser(req, res) {

//     try {
//         // Encriptação da palavra passe
//         const hashedPasswords = await bcrypt.hash(req.body.password, 10)
//         const user = { name: req.body.name, password: hashedPasswords }
//         users.push(user)
//         res.status(201).send()
//     } catch {
//         res.status(500).send()
//     }
// }

// function loginUser(req, res) {
//     const user = users.find(user => user.name === req.body.name)
//     if(user == null)
//     {
//         return res.status(400).send('Utilizador não encontrado')
//     }
//     try{
//         if(await bcrypt.compare(req.body.password, user.password)){
//             res.send('Sucesso')
//         }else{
//             res.send('Não Autorizado')
//         }
//     }catch{
//         res.status(500).send()
//     }
// }

// function getUser(req, res){
//     res.json(users)
// }

// module.exports = {registerUser, loginUser, getUser}


/* eslint-disable no-use-before-define */


const bcrypt = require('bcrypt-nodejs');
const ValidationError = require('../errors/validationError');

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = (app) => {
  const findOne = async (filter = {}) => {
    const result = await app.db('utilizador').where(filter).first();
    return result;
  };

  const getPasswordHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };

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
    if (!emailRegex.test(req.email)) throw new ValidationError('O email não segue os padrões convencionais!');
    if (!passwordRegex.test(req.password)) throw new ValidationError('A password não segue os padrões convencionais!');

    const userDBEmail = await findOne({ email: req.email });
    if (userDBEmail) throw new ValidationError('Email duplicado');

    const userDBNTelemovel = await findOne({ telemovel: req.telemovel });
    if (userDBNTelemovel) throw new ValidationError('Número telemóvel duplicado');

    const newUser = { ...req };
    newUser.palavraPasse = getPasswordHash(req.palavraPasse);

    return app.db('utilizador').insert(newUser, ['id', 'nome', 'nomeUtilizador', 'palavraPasse', 'email', 'telemovel', 'rua', 'cidade', 'distrito', 'pais']);
  };

  const update = async (req, res) => {
    if (req.palavraPasse) { req.palavraPasse = getPasswordHash(req.palavraPasse); }

    console.log(req)

    return app.db('utilizador').where({ id }).update(req, ['id', 'nome', 'nomeUtilizador', 'palavraPasse', 'email', 'telemovel', 'rua', 'cidade', 'distrito', 'pais']);
  };

  const remove = async (id) => {
    return app.db('utilizador').where({ id }).del();
  };

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
    findOne,
    create,
    update,
    remove,
    forgotPassword,
  };
};
