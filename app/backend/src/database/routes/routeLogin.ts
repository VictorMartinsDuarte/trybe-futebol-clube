import * as express from 'express';
import controllerLogin from '../controllers/controllerLogin';
import mid from '../middlewares/middleLogin';

const login = express.Router();

login.post('/', mid.loginValid, mid.loginIncorrect, controllerLogin.getUserToken);
login.get('/validate', controllerLogin.loginValidate);

export default login;
