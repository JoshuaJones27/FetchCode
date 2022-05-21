const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');


const secret = '754321';

const ROUTE = '/v1/transporte';
let transporteA;

beforeAll(async () => {
  const createTransporteA = await app.services.transporte.create({
    dataTransporte: '2022-05-21 00:00:00',
  });

  transporteA = { ...createTransporteA[0] };
});

test('Test #1 - Listar transportes', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${transporteA.id}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar transportes por ID', () => {
  return request(app).get(`${ROUTE}/${transporteA.id}`)
    .set('authorization', `bearer ${transporteA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('4700-289');
    });
});

test('Test #3 - Apagar Transporte', () => {
  return app.db('transporte').insert({
    codPostal: '4700-290',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${utilizador.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});
