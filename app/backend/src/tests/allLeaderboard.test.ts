import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import serviceMatches from '../database/services/serviceMatches';
import servideLeaderboard from '../database/services/servideLeaderboard';
// import { returnLbByType, sortedBoard, returnHomeAndAway } from '../database/utils/leaderboard';
// import controllerMatches from '../database/controllers/controllerMatches';
import { arrayMatchesMock } from './mocks/mocksMatches';
import { leaderboardMock } from './mocks/mocksLeaderboard';

chai.use(chaiHttp);
const { expect } = chai;

describe('Tests on service layer for leaderboard', () => {

  beforeEach(() => {
    sinon.stub(servideLeaderboard, 'createLeaderboard').resolves(leaderboardMock);
    sinon.stub(servideLeaderboard, 'lbHomeAndAway').resolves(leaderboardMock);
  })

  afterEach(() => {
    (servideLeaderboard.createLeaderboard as sinon.SinonStub).restore();
    (servideLeaderboard.lbHomeAndAway as sinon.SinonStub).restore();
  })

  describe('Tests function createLeaderboard', () => {
    
    it ('Return all matches', async () => {
      const leaderboard = await servideLeaderboard.createLeaderboard('home');
      expect(leaderboard).to.be.equal(leaderboardMock);
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.be.equal(200);
    })
    describe('Tests function lbHomeAndAway', () => {

      it ('Return the created match', async () => {
        const leaderboard = await servideLeaderboard.lbHomeAndAway();
        expect(leaderboard).to.be.equal(leaderboardMock);
        const response = await chai.request(app).get('/leaderboard');
        expect(response.status).to.be.equal(200);
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
