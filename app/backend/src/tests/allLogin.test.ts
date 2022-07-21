import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';
import serviceLogin from '../database/services/serviceLogin';
import { tokenLogin, userLogin } from './mocks/mocksLogin';
import tokenJWT from '../database/utils/tokenJWT';

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
      // chaiHttpResponse = await chai.request(app)
      //   .post('/login').type('form').send(userLogin)
      //   .then(function (getUserToken) {
      //     expect(getUserToken).to.be.an('string');
      //   })
      //   .catch(function (err) {
      //     throw err;
      //   });
      // Ref: https://www.chaijs.com/plugins/chai-http/
      const response = await serviceLogin.getUserToken(userLogin);
      expect(response).to.be.an('string');

      const { email } = userLogin;
      expect(await tokenJWT(email)).to.be.an('string');
    })
  });
});
