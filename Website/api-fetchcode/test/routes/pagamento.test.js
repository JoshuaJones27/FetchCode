const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');

const secret = '754321';

const ROUTE = '/v1/pagamento';
let pagamentoA;

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

  const createPagamentoA = await app.services.pagamento.create({
    pagamentoTipoID: '3',
    encomendaID: '2',
  });

  pagamentoA = { ...createPagamentoA[0] };
});

test('Test #1 - Listar os pagamentos', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${user.id}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #1.1 - Listar os pagamentos por ID', () => {
  return request(app).get(`${ROUTE}/${pagamentoA.id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
    });
});

test('Test #3 - Apagar pagamento', () => {
  return app.db('pagamento').insert({
    pagamentoTipoID: '3',
    encomendaID: '2',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});
