import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
// import TeamsModel from '../database/models/TeamsModel';
// import oneTeamMock from '../utils/mocks/teamsMock'
// import { Team } from '../types/Team';
// import ITeams from '../Interfaces/ITeams'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota raiz ("/")', () => {
  // let chaiHttpResponse: Response;

  afterEach(sinon.restore);

  it('Testa a rota com sucesso', async () => {
    const app = new App().app;
    const { status, ok } = await chai.request(app).get('/');

    expect(status).to.be.equal(200);
    expect(ok).to.be.eq(true);
  });

  it('Testa o listening da porta', async () => {
    const listen = new App().start(3333);

    expect(listen).to.be.equal(undefined);
  });
});
