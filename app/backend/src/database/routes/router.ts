import * as express from 'express';
import login from './routeLogin';
import teams from './routeTeams';

const router = express.Router();

router.use('/login', login);
router.use('/teams', teams);

export default router;
