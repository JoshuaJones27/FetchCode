const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');


const secret = '754321';

const ROUTE = '/v1/cor';
let corA;

beforeAll(async () => {
  const corA = await app.services.cor.create({
    codPostal: '4700-289',
  });

  codPostalA = { ...createCodPostal[0] };
});

test('Test #1 - Listar os codigos postais', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${codPostalA.id}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar codigos postais por ID', () => {
  return request(app).get(`${ROUTE}/${codPostalA.id}`)
    .set('authorization', `bearer ${codPostalA.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('4700-289');
    });
});

test('Test #3 - Apagar Código Postal', () => {
  return app.db('codigopostal').insert({
    codPostal: '4700-290',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${utilizador.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});
