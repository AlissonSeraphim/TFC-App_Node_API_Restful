// testar a rota /teams e o método GET
import * as chai from 'chai';
import * as sinon from 'sinon';

// @ts-ignore
import chaiHttp = require('chai-http');

import TeamsModel from '../database/models/TeamsModel';
import { arrayTeamsMock } from './mocks/teamsMock';
import { App } from '../app';

chai.use(chaiHttp);

const { app } = new App();
const { expect } = chai;

describe('TeamsService', function() {
  beforeEach(function () { sinon.restore(); });

  it('Retorna todos os times com sucesso 200', async function() {
    sinon.stub(TeamsModel, 'findAll').resolves(arrayTeamsMock as any);

    const {status, body} = await chai.request(app).get('/teams');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(arrayTeamsMock);
  });
})
