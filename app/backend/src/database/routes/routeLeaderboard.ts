import * as express from 'express';
import controllerLeaderboard from '../controllers/controllerLeaderboard';

const leaderboard = express.Router();

leaderboard.get('/home', controllerLeaderboard.createLeaderboard);
leaderboard.get('/away', controllerLeaderboard.createLeaderboard);
leaderboard.get('/', controllerLeaderboard.lbHomeAndAway);

export default leaderboard;
