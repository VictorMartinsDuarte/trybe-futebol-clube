import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import serviceMatches from '../database/services/serviceMatches';
import controllerMatches from '../database/controllers/controllerMatches';
import { arrayMatchesMock, createMatchPostMock } from './mocks/mocksMatches';
import IMatches from '../database/interfaces/iMatches';
import { userToken } from './mocks/mocksLogin';
import tokenValid from '../database/middlewares/middleToken'

chai.use(chaiHttp);
const { expect } = chai;
// createMatch,
// finishMatch,
// updateMatch,

describe('Tests on service layer for matches', () => {
  const req = {
    headers:{
      authorization: userToken,
    }
  } as any;

  beforeEach(() => {
    sinon.stub(serviceMatches, 'getAllMatches').resolves(arrayMatchesMock);
    sinon.stub(serviceMatches, 'createMatch').resolves(arrayMatchesMock[0]);
    req.headers.authorization = userToken;
    sinon.stub().resolves();
  })

  afterEach(() => {
    (serviceMatches.getAllMatches as sinon.SinonStub).restore();
    (serviceMatches.createMatch as sinon.SinonStub).restore();
  })

  describe('Tests function getAllMatches', () => {
    
    it ('Return all matches', async () => {
      const teams = await serviceMatches.getAllMatches();
      expect(teams).to.be.equal(arrayMatchesMock);
      const response = await chai.request(app).get('/matches');
      expect(response.status).to.be.equal(200);
    })
    describe('Tests function createMatch', () => {

      it ('Return the created match', async () => {
        const newMatch = await serviceMatches.createMatch(createMatchPostMock as IMatches);
        expect(newMatch).to.be.equal(arrayMatchesMock[0]);
        const response = await chai.request(app).post('/matches').send(createMatchPostMock);
        expect(response.status).to.be.equal(401);
      })
    });
  });
  // describe('Tests function getTeamById', () => {

  //   beforeEach(() => {
  //     sinon.stub(serviceTeams, 'getTeamById').resolves(arrayTeamsMock[0]);
  //   })

  //   afterEach(() => {
  //     (serviceTeams.getTeamById as sinon.SinonStub).restore();
  //   })
    
  //   it ('Returns the response 200 and role from user in json', async () => {
  //     const response = await chai.request(app).get('/teams/3');
  //     expect(response.status).to.be.equal(200);
  //   })
  // });
});
