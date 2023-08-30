// Testa a rota login
import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');

import UsersModel from '../database/models/UsersModel';
import userToken from './mocks/usersMock';
// import { arrayTeamsMock } from './mocks/teamsMock';
import { App } from '../app';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('UsersService', function() {
  beforeEach(function () { sinon.restore(); });

  it('Retorna um token com sucesso', async function() {
    sinon.stub(UsersModel, 'findOne').resolves({ id: 1, password: 'asdasdasd', role: 'asdasdas', username: 'asdasdasd' } as any);
    sinon.stub(JWT, 'sign').returns(userToken.token);

    const result = await chai.request(app).post('/login').send(
      { email: 'aaa', password: 'aaaaaaaa' });
    
    expect(result.status).to.be.equal(200);
  });

})
