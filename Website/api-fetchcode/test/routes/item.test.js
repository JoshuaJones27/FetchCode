const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../source/app');

const secret = '754321';

const ROUTE = '/v1/item';
let itemA;
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
  
  const createItemA = await app.services.item.create({
    tipoId: '2',
    tamanho: '45',
    descricao: 'Air Jordan 1',
    stock: '4',
    imagem: 'porInserir',
  });

  itemA = { ...createItemA[0] };
});

test('Test #1 - Listar os items', () => {
  return request(app).get(ROUTE)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    });
});

test('Test #1.1 - Listar os items por ID', () => {
  return request(app).get(`${ROUTE}/${itemA.id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.nome).toBe('2');
    });
});

test('Test #3 - Apagar Items', () => {
  return app.db('item').insert({
    tipoId: '2',
    tamanho: '45',
    descricao: 'Air Jordan 1',
    stock: '4',
    imagem: 'porInserir',
  }, ['id']).then((result) => request(app).delete(`${ROUTE}/${result[0].id}`)
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
      expect(res.status).toBe(204);
    }));
});
