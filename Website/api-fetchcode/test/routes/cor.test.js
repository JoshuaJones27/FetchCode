const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');


const secret = '754321';

const ROUTE = '/v1/cor';
let corA;

beforeAll(async () => {
  const createCorA = await app.services.cor.create({
    cor: 'verde',
  });

  corA = { ...createCorA[0] };
});

test('Test #1 - Listar cores', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${corA.id}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar cores por ID', () => {
  return request(app).get(`${ROUTE}/${corA.id}`)
    .set('authorization', `bearer ${corA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('4700-289');
    });
});

test('Test #3 - Apagar Cor', () => {
  return app.db('cor').insert({
    codPostal: '4700-290',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${utilizador.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});