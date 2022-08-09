import * as express from 'express';
import login from './routeLogin';
import teams from './routeTeams';
import matches from './routeMatches';

const router = express.Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);

export default router;
