import * as express from 'express';
import controllerLogin from '../controllers/controllerLogin';
import loginValid from '../middlewares/middleLogin';

const login = express.Router();

login.post('/', loginValid, controllerLogin.getUserToken);

export default login;
