import * as express from 'express';
import controllerLogin from '../controllers/controllerLogin';
import mid from '../middlewares/middleLogin';
import errorHandler from '../middlewares/middleError';

const login = express.Router();

login.post('/', mid.loginValid, mid.loginIncorrect, errorHandler, controllerLogin.getUserToken);
login.get('/validate', controllerLogin.loginValidate);

export default login;
