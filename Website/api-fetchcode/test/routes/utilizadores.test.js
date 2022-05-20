const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');
const config = require('../../config');

const secret = config.authToken;

const ROUTE = '/routes/utilizador';
let userA;

beforeAll(async () => {
  const createUser = await app.services.user.create({
    nome: 'Jose Mourinho',
    nomeUtilizador: 'ZezitoMouri69',
    palavraPasse: 'zezinhoMourinhoxd',
    email: 'josemourinho97@ipca.pt',
    telemovel: '969696969',
    rua: 'Vila Frescainha',
    cidade: 'Barcelos',
    distrito: 'Braga',
    pais: 'Portugal',
    isFuncionario: '0',
    isAdmin: '1',
  });

  user = { ...createUser[0] };
  user.token = jwt.encode(user, secret);
});

test('Test #1 - Listar os utilizadores', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar utilizador por ID', () => {
  return request(app).get(`${ROUTE}/${user.id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('Jose Mourinho');
    });
});

test('Test #1.6 - Listar os utilizadores por nome', () => {
  return request(app).get(`${ROUTE}/activeUsers/searchByName?nome=${user.nome}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #2 - Atualizar dados de um utilizador', () => {
  return app.db('utilizador').insert({
    nome: 'Jose Mourinho',
    nomeUtilizador: 'ZezitoMouri69',
    palavraPasse: 'zezinhoMourinhoxd',
    email: 'josemourinho97@ipca.pt',
    telemovel: '+44 115 496 0832',
    rua: 'Abbey Bridge',
    cidade: 'Abbey',
    distrito: 'Nottingham',
    pais: 'Inglaterra',
    isFuncionario: '1',
    isAdmin: '0',
  }, ['id']).then((result) => request(app).put(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${user.token}`)
    .send({ nome: 'User Updated' })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body[0].nome).toBe('User Updated');
    }));
});

test('Test #4 - Apagar utilizador', () => {
  return app.db('utilizador').insert({
    nome: 'Jose Mourinho',
    nomeUtilizador: 'ZezitoMouri69',
    palavraPasse: 'zezinhoMourinhoxd',
    email: 'josemourinho97@ipca.pt',
    telemovel: '+44 115 496 0832',
    rua: 'Abbey Bridge',
    cidade: 'Abbey',
    distrito: 'Nottingham',
    pais: 'Inglaterra',
    isFuncionario: '1',
    isAdmin: '0',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});
