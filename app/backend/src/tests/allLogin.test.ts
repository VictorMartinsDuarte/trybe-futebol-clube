import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import serviceLogin from '../database/services/serviceLogin';
import controllerLogin from '../database/controllers/controllerLogin';
import { userToken, userLogin, roleMock, payloadMock } from './mocks/mocksLogin';
import tokenJWT, { decodedToken } from '../database/utils/tokenJWT';

chai.use(chaiHttp);
const { expect } = chai;

describe('Tests on service layer for login', () => {
  describe('Tests function getUserToken', () => {

    beforeEach(() => {
      sinon.stub(serviceLogin, 'getUserToken').resolves(userToken as string);
    })

    afterEach(() => {
      (serviceLogin.getUserToken as sinon.SinonStub).restore();
    })
    
    it ('Return the token from user', async () => {
      const response = await serviceLogin.getUserToken(userLogin);
      expect(response).to.be.an('string');
      
      const { email } = userLogin;
      expect(await tokenJWT(email)).to.be.an('string');
    })
  });
  describe('Tests function loginValidate', () => {
    beforeEach(() => {
      sinon.stub(serviceLogin, 'loginValidate').resolves(roleMock);
    })
    
    afterEach(() => {
      (serviceLogin.loginValidate as sinon.SinonStub).restore();
    })
    
    it ('Returns the response 200 and role from user in json', async () => {
      const response = await serviceLogin.loginValidate(userToken);
      expect(response).to.be.equal(roleMock);
    })
  });
});

describe('Tests on controller layer for login', () => {
  describe('Tests function getUserToken', () => {
    const req = {} as any;
    const res = {} as any;

    beforeEach(() => {
      sinon.stub(serviceLogin, 'getUserToken').resolves(userToken);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(userToken);
    })

    afterEach(() => {
      (serviceLogin.getUserToken as sinon.SinonStub).restore();
    })
    
    it ('Returns the response 200 and token from user in json', async () => {
      const response = await controllerLogin.getUserToken(req, res);
      expect(response).to.be.an('string');
      expect(res.status.calledWith(200)).to.equal(true);
    })
  });
    describe('Tests function loginValidate', () => {
      // const req = {} as any;
      // const res = {} as any;
  
      beforeEach(() => {
        sinon.stub(serviceLogin, 'loginValidate').resolves(roleMock);
        // res.status = sinon.stub().returns(res);
        // req.headers = { Authorization: userToken };
      })
  
      afterEach(() => {
        (serviceLogin.loginValidate as sinon.SinonStub).restore();
      })
      
      it ('Returns the response 200 and role from user in json', async () => {
        const response = await chai.request(app).get('/login/validate');
        expect(response.status).to.be.equal(200);
      })
    });
});
