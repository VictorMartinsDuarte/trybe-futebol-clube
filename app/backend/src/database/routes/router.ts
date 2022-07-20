import * as express from 'express';
import login from './routeLogin';

const router = express.Router();

router.use('/login', login);

export default router;
