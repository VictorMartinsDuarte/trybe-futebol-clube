import * as express from 'express';
import login from './routeLogin';
import teams from './routeTeams';
import matches from './routeMatches';
import leaderboard from './routeLeaderboard';

const router = express.Router();

router.use('/login', login);
router.use('/teams', teams);
router.use('/matches', matches);
router.use('/leaderboard', leaderboard);

export default router;
