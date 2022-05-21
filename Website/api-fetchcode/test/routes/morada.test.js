const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');

const secret = '754321';

const ROUTE = '/v1/morada';
let moradaA;

beforeAll(async () => {
  const moradaA = await app.services.morada.create({
    rua: 'Vila Frescainha',
    cidade: 'Barcelos',
    distrito: 'Braga',
    pais: 'Portugal',
  });

  moradaA = { ...createMorada[0] };
});

test('Test #1 - Listar as moradas', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${moradaA.id}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar as moradas por ID', () => {
  return request(app).get(`${ROUTE}/${moradaA.id}`)
    .set('authorization', `bearer ${moradaA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('4700-289');
    });
});

test('Test #3 - Apagar Morada', () => {
  return app.db('morada').insert({
    rua: 'Vila Frescainha',
    cidade: 'Barcelos',
    distrito: 'Braga',
    pais: 'Portugal',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${utilizador.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});
