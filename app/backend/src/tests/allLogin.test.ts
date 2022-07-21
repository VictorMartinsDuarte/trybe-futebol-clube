import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

// import { app } from '../app';
// import { Response } from 'superagent';
import serviceLogin from '../database/services/serviceLogin';
import controllerLogin from '../database/controllers/controllerLogin';
import { tokenLogin, userLogin } from './mocks/mocksLogin';
import tokenJWT from '../database/utils/tokenJWT';
import loginValid from '../database/middlewares/middleLogin';

chai.use(chaiHttp);
const { expect } = chai;

describe('Tests on service layer for login', () => {
  describe('Tests function getUserToken', () => {
    // let chaiHttpResponse: Response;
    beforeEach(() => {
      sinon.stub(serviceLogin, 'getUserToken').resolves(tokenLogin as string);
    })

    afterEach(() => {
      (serviceLogin.getUserToken as sinon.SinonStub).restore();
    })
    
    it ('Return the token from user', async () => {
      const response = await serviceLogin.getUserToken(userLogin);
      expect(response).to.be.an('string');
      
      const { email } = userLogin;
      expect(await tokenJWT(email)).to.be.an('string');
      // chaiHttpResponse = await chai.request(app)
      //   .post('/login').type('form').send(userLogin)
      //   .then(function (getUserToken) {
      //     expect(getUserToken).to.be.an('string');
      //   })
      //   .catch(function (err) {
      //     throw err;
      //   });
      // Ref: https://www.chaijs.com/plugins/chai-http/
    })
  });
});

describe('Tests on controller layer for login', () => {
  describe('Tests function getUserToken', () => {
    // const err = { status: 500, message: 'Request failed' };
    const req = {} as any;
    const res = {} as any;
    const next = {} as any;

    beforeEach(() => {
      sinon.stub(serviceLogin, 'getUserToken').resolves(tokenLogin);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(tokenLogin);
    })

    afterEach(() => {
      (serviceLogin.getUserToken as sinon.SinonStub).restore();
    })
    
    it ('Returns the response 200 and token from user in json', async () => {
      const response = await controllerLogin.getUserToken(req, res, next);
      expect(response).to.be.an('string');
      expect(res.status.calledWith(200)).to.equal(true);
      // await chai.request(app).post('/login').then(res => {
      //   chai.expect(res.status).to.eql(200);
      //   chai.expect(res.text).to.eql(tokenLogin);
      // });
    })
    // it ('When login request fails', async () => {
    //   const response = await controllerLogin.getUserToken(req, res, next);
    //   expect(next(err)).to.redirect('object');
    // });
  });

  // describe('Tests on middleware for login', () => {
  //   describe('Tests function loginValid', () => {
  //     const req = {} as any;
  //     const res = {} as any;
  //     const next = {} as any;
  
  //     beforeEach(() => {
  //       // const loginValid = sinon.stub().resolves(tokenLogin);
  //       res.status = sinon.stub().returns(res);
  //       res.json = sinon.stub().returns(tokenLogin);
  //     })
  
  //     afterEach(() => {
  //       (serviceLogin.getUserToken as sinon.SinonStub).restore();
  //     })
      
  //     it ('Returns the response X', async () => {
  //     })
  //   });
  // });
});
