const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');


const secret = '754321';

const ROUTE = '/v1/encomenda';
let encomendaA;

beforeAll(async () => {
  const createEncomendaA = await app.services.encomenda.create({
    encomendaDescricao: 'Air Jordan 1',
    estado: '0',
  });

  encomendaA = { ...createEncomendaA[0] };
});

test('Test #1 - Listar encomendas', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${encomendaA.idEncomenda}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar encomendas por ID', () => {
  return request(app).get(`${ROUTE}/${encomendaA.idEncomenda}`)
    .set('authorization', `bearer ${encomendaA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('Air Jordan 1');
    });
});

test('Test #3 - Apagar Encomenda', () => {
  return app.db('encomenda').insert({
    encomendaDescricao: 'Air Jordan 1',
    estado: '0',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${utilizador.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});