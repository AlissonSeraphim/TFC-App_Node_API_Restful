// Testa a rota login
import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesModel from '../database/models/MatchesModel';
import { App } from '../app';
// import JWT from '../utils/JWT';
import MatchesService from '../services/MatchesService';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const matchesService = new MatchesService();

//Mocks
import { getAllMock } from './mocks/matchesMock';
import JWT from '../utils/JWT';
import userToken, { createMatchBody, createMatchMock, createMatchReturnMock, createMatchWithoutOneTeamBody, sameIdTeamsBody, sameIdTeamsMock } from './mocks/usersMock';

describe('Testa a rota /matches', function () {
  beforeEach(function () { sinon.restore(); });

  describe('Método GET /matches', function () {
    beforeEach(function () { sinon.restore(); });

    it('Retorna todos os jogos com sucesso', async function () {
      sinon.stub(MatchesModel, 'findAll').resolves(getAllMock as any);

      const result = await chai.request(app).get('/matches')
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal(getAllMock);
    });

    it('Retorna todos os jogos em andamento com sucesso', async function () {
      sinon.stub(MatchesModel, 'findAll').resolves(getAllMock as any);

      const result = await chai.request(app).get('/matches?inProgress=true')
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal(getAllMock);
    });

    it('Retorna todos os jogos finalizados com sucesso', async function () {
      sinon.stub(MatchesModel, 'findAll').resolves(getAllMock as any);

      const result = await chai.request(app).get('/matches?inProgress=false')
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal(getAllMock);
    });

    it('Retorna todos os jogos finalizados com sucesso', async function () {
      sinon.stub(MatchesModel, 'findAll').resolves(getAllMock as any);

      const result = await chai.request(app).get('/matches?inProgress=false')
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal(getAllMock);
    });
  });

  describe('Método PATCH /matches/:id/finish', function () {
    beforeEach(function () { sinon.restore(); });

    it('Finaliza partida em andamento com sucesso', async function () {
      sinon.stub(JWT, 'verify').returns({ email: 'alguma@coisa.com'});
      sinon.stub(MatchesModel, 'update').resolves([[{affectedCount: 1}], []] as any);

      const result = await chai.request(app).patch('/matches/1/finish').set('authorization', userToken.token).send();
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal({ message: 'Finished' });
    });

    it('Não finaliza uma partida já finalizada', async function () {
      sinon.stub(JWT, 'verify').returns({ email: 'alguma@coisa.com'});
      sinon.stub(MatchesModel, 'update').resolves([0] as any);

      const result = await chai.request(app).patch('/matches/42/finish').set('authorization', userToken.token).send();
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });
  });

  describe('Método PATCH /matches/:id', function () {
    beforeEach(function () { sinon.restore(); });

    it('Atualiza uma partida em andamento com sucesso', async function () {
      sinon.stub(JWT, 'verify').returns({ email: 'alguma@coisa.com'});
      sinon.stub(MatchesModel, 'update').resolves([[{affectedCount: 1}], []] as any);

      const result = await chai.request(app).patch('/matches/1').set('authorization', userToken.token).send(
        {
          "homeTeamGoals": 3,
          "awayTeamGoals": 1
        }
      );
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal({ message: 'Updated' });
    });

    it('Não atualiza partida em andamento sem token', async function () {
      const result = await chai.request(app).patch('/matches/1')
      expect(result.status).to.be.equal(401);
    });

    it('Não atualiza uma partida se o token não possui email relacionado', async function () {
      sinon.stub(JWT, 'verify').returns({ age: 24 });

      const result = await chai.request(app).patch('/matches/1').set('authorization', userToken.token).send();
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });
  });

  describe('Método POST /matches', function () {
    beforeEach(function () { sinon.restore(); });

    it('Cadastra nova partida em andamento com Sucesso', async function () {
      sinon.stub(JWT, 'verify').returns({ email: 'alguma@coisa.com'});
      sinon.stub(MatchesModel, 'create').resolves(createMatchReturnMock as any);
      sinon.stub(MatchesModel, 'findOne').resolves(99 as any);

      const result = await chai.request(app).post('/matches')
      .set('authorization', userToken.token)
      .send(createMatchBody);
      expect(result.status).to.be.equal(201);
      expect(result.body).to.be.deep.equal(createMatchReturnMock);
    });

    it('Falha a cadastrar times com mesmo id', async function () {
      sinon.stub(JWT, 'verify').returns({ email: 'alguma@coisa.com'});
      sinon.stub(MatchesModel, 'create').resolves(sameIdTeamsMock as any);
      sinon.stub(MatchesModel, 'findOne').resolves(99 as any);

      const result = await chai.request(app).post('/matches')
      .set('authorization', userToken.token)
      .send(sameIdTeamsBody);
      expect(result.status).to.be.equal(422);
      expect(result.body).to.be.deep.equal({
        message: 'It is not possible to create a match with two equal teams'
      });
    });

    it('Não cadastra partida sem os 2 times serem informados', async function () {
      sinon.stub(JWT, 'verify').returns({ email: 'alguma@coisa.com'});
      sinon.stub(MatchesModel, 'findOne').resolves(undefined as any);

      const result = await chai.request(app).post('/matches')
      .set('authorization', userToken.token)
      .send(createMatchWithoutOneTeamBody);
      expect(result.status).to.be.equal(404);
      expect(result.body).to.be.deep.equal({ message: 'There is no team with such id!' });
    });

    it('Não cadastra partida sem email cadastrado', async function () {
      sinon.stub(JWT, 'verify').returns({ anything: 'something'});

      const result = await chai.request(app).post('/matches')
      .set('authorization', userToken.token)
      .send(createMatchBody);
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

  });
})
