const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');

const secret = '754321';

const ROUTE = '/v1/utilizador';
let userA;

beforeAll(async () => {
  const createUserA = await app.services.utilizador.create({
    nome: 'Jose Mourinho',
    nomeUtilizador: 'josemourinho69',
    palavraPasse: 'Zezinho_69123',
    email: 'zemourixd@ipca.pt',
    telemovel: '969696969',
    rua: 'Vila Frescainha',
    cidade: 'Barcelos',
    distrito: 'Braga',
    pais: 'Portugal',
    isFuncionario: '1',
    isAdmin: '0',
  });

  userA = { ...createUserA[0] };
  userA.token = jwt.encode(userA, secret);
});

test('Test #1 - Listar os utilizadores', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar utilizador por ID', () => {
  return request(app).get(`${ROUTE}/${userA.id}`)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('Jose Mourinho');
    });
});

test('Test #1.2 - Listar os utilizadores por nome', () => {
  return request(app).get(`${ROUTE}/activeUsers/searchByName?nome=${userA.nome}`)
    .set('authorization', `bearer ${userA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #2 - Atualizar dados de um utilizador', () => {
  return app.db('utilizador').insert({
    nome: 'Jose Mourinho',
    nomeUtilizador: 'ZezitoMouri69',
    palavraPasse: 'Zezinho_6912322',
    email: 'josemourinho97@ipca.pt',
    telemovel: '+44 115 496 0832',
    rua: 'Abbey Bridge',
    cidade: 'Abbey',
    distrito: 'Nottingham',
    pais: 'Inglaterra',
    isFuncionario: '0',
    isAdmin: '1',
  }, ['id']).then((result) => request(app).put(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${utilizador.token}`)
    .send({ nome: 'User Updated' })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body[0].nome).toBe('User Updated');
    }));
});

test('Test #3 - Apagar utilizador', () => {
  return app.db('utilizador').insert({
    nome: 'Jose Mourinho',
    nomeUtilizador: 'ZezitoMouri69',
    palavraPasse: 'Zezinho_6912322',
    email: 'josemourinho97@ipca.pt',
    telemovel: '+44 115 496 0832',
    rua: 'Abbey Bridge',
    cidade: 'Abbey',
    distrito: 'Nottingham',
    pais: 'Inglaterra',
    isFuncionario: '0',
    isAdmin: '1',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${utilizador.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});
