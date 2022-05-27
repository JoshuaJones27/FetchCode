const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');

const secret = '754321';

const ROUTE = '/v1/codigoPostal';
let codPostalA;
let user;

beforeAll(async () => {

  const createUser = await app.services.utilizador.create({
    nome: 'Jose Mourinho',
    nomeUtilizador: 'josemourinho69V2',
    palavraPasse: 'Zezinho_69123V2',
    email: 'zemourixdV2@ipca.pt',
    telemovel: '969696969',
    rua: 'Vila Frescainha',
    cidade: 'Barcelos',
    distrito: 'Braga',
    pais: 'Portugal',
    isFuncionario: '1',
    isAdmin: '0',
  });

  user = { ...createUser[0] };
  user.token = jwt.encode(user, secret);

  const createCodPostalA = await app.services.codigoPostal.create({
    codPostal: '4700-289',
  });

  codPostalA = { ...createCodPostalA[0] };
});

test('Test #1 - Listar os codigos postais', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar codigos postais por ID', () => {
  return request(app).get(`${ROUTE}/${codPostalA.id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #3 - Apagar Código Postal', () => {
  return app.db('codigopostal').insert({
    codPostal: '4700-290',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});
