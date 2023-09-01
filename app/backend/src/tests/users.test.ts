// Testa a rota login
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import UsersModel from '../database/models/UsersModel';
import userToken from './mocks/usersMock';
// import { arrayTeamsMock } from './mocks/teamsMock';
import { App } from '../app';
import JWT from '../utils/JWT';
import UsersService from '../services/UsersService';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;
const userService = new UsersService();

describe('UsersService', function () {
  beforeEach(function () { sinon.restore(); });

  // it('Retorna um token com sucesso', async function() {
  //   sinon.stub(UsersModel, 'findOne').resolves({ id: 5, email: 'dasdas@asdasd.com', password: 'asdasdasd', role: 'asdasdas', username: 'asdasdasd' } as any);
  //   sinon.stub(JWT, 'sign').returns(userToken.token);
  //   sinon.stub(bcrypt, 'compareSync').returns(true);

  //   // testa um request post em '/login' com sucesso
  //   const result = await userService.login({ email: 'dasdas@asdasd.com', password: 'asdasdasd' });
  //   const {status, data} = result;
  //   expect(status).to.be.equal('SUCCESSFUL');
  //   expect(data).to.be.deep.equal({ token: userToken.token });
  // });
  describe('Testa a rota /login', function () {
    beforeEach(function () { sinon.restore(); });

    it('Retorna um token com sucesso', async function () {
      sinon.stub(UsersModel, 'findOne').resolves({ id: 5, email: 'dasdas@asdasd.com', password: 'asdasdasd', role: 'asdasdas', username: 'asdasdasd' } as any);
      sinon.stub(JWT, 'sign').returns(userToken.token);
      sinon.stub(bcrypt, 'compareSync').returns(true);

      const result = await chai.request(app).post('/login').send({ email: 'dasdas@asdasd.com', password: 'asdasdasd' })
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal({ token: userToken.token });
    });

    it('Não existe usuário com este email', async function () {
      sinon.stub(UsersModel, 'findOne').resolves(null);

      const result = await chai.request(app).post('/login').send({ email: 'dasdas@asdasd.com', password: 'asdasdasd' })
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('O email enviado não está cadastrado', async function () {
      sinon.stub(UsersModel, 'findOne').resolves({ id: 5, email: 'alisson@asdasd.com', password: 'asdasdasd', role: 'asdasdas', username: 'asdasdasd' } as any);

      const result = await chai.request(app).post('/login').send({ email: 'roberto@asdasd.com', password: 'asdasdasd' })
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('Usuário não cadastrado', async function () {
      sinon.stub(UsersModel, 'findOne').resolves(null);

      const result = await chai.request(app).post('/login').send({ email: 'roberto@asdasd.com', password: 'asdasdasd' })
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('a senha enviada não está cadastrada', async function () {
      sinon.stub(UsersModel, 'findOne').resolves({ id: 5, email: 'alisson@asdasd.com', password: 'asdasdasd', role: 'asdasdas', username: 'asdasdasd' } as any);
      sinon.stub(bcrypt, 'compareSync').returns(false);
      const result = await chai.request(app).post('/login').send({ email: 'alisson@asdasd.com', password: 'asdasdasd' })
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  })

  describe('Testa a rota /login/role', function () {
    beforeEach(function () { sinon.restore(); });

    it('Retorna 401 com token invalido', async function () {
      sinon.stub(JWT, 'verify').returns('Token must be a valid token');
      sinon.stub(UsersModel, 'findOne').resolves({ id: 5, email: 'dasdas@asdasd.com', password: 'asdasdasd', role: 'rei', username: 'asdasdasd' } as any);
      const result = await chai.request(app).get('/login/role').set('authorization', userToken.token).send();
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Token must be a valid token'});
    });

    it('Retorna 401 se email não está registrado no token', async function () {
      sinon.stub(JWT, 'verify').returns({ nothing: null });
      sinon.stub(UsersModel, 'findOne').resolves({ id: 5, email: 'dasdas@asdasd.com', password: 'asdasdasd', role: 'rei', username: 'asdasdasd' } as any);
      
      const result = await chai.request(app).get('/login/role').set('authorization', userToken.token).send();
      
      expect(result.status).to.be.equal(401);
      expect(result.body).to.be.deep.equal({ message: 'Token must be a valid token' });
    });

    it('Retorna role com token valido status 200', async function () {
      sinon.stub(JWT, 'verify').returns({ email: 'dasdas@asdasd.com' });
      sinon.stub(UsersModel, 'findOne').resolves({ id: 5, email: 'dasdas@asdasd.com', password: 'asdasdasd', role: 'rei', username: 'asdasdasd' } as any);
      
      const result = await chai.request(app).get('/login/role').set('authorization', userToken.token).send();
      
      expect(result.status).to.be.equal(200);
      expect(result.body).to.be.deep.equal({ role: 'rei' });
    });
  })
})
