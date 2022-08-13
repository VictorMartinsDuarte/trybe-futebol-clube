import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import serviceTeams from '../database/services/serviceTeams';
import controllerTeams from '../database/controllers/controllerTeams';
import { arrayTeamsMock } from './mocks/mocksTeams';

chai.use(chaiHttp);
const { expect } = chai;

describe('Tests on service layer for teams', () => {
  describe('Tests function getAllTeams', () => {
    beforeEach(() => {
      sinon.stub(serviceTeams, 'getAllTeams').resolves(arrayTeamsMock);
    })

    afterEach(() => {
      (serviceTeams.getAllTeams as sinon.SinonStub).restore();
    })
    
    it ('Return the token from user', async () => {
      const teams = await serviceTeams.getAllTeams();
      expect(teams).to.be.equal(arrayTeamsMock);
      const response = await chai.request(app).get('/teams');
      expect(response.status).to.be.equal(200);
    })
  });
  describe('Tests function getTeamById', () => {

    beforeEach(() => {
      sinon.stub(serviceTeams, 'getTeamById').resolves(arrayTeamsMock[0]);
    })

    afterEach(() => {
      (serviceTeams.getTeamById as sinon.SinonStub).restore();
    })
    
    it ('Returns the response 200 and role from user in json', async () => {
      const response = await chai.request(app).get('/teams/3');
      expect(response.status).to.be.equal(200);
    })
  });
});
