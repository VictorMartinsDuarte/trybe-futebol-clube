import * as express from 'express';
import controllerTeams from '../controllers/controllerTeams';

const teams = express.Router();

teams.get('/', controllerTeams.getAllTeams);
teams.get('/:id', controllerTeams.getTeamById);

export default teams;
