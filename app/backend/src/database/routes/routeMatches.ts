import * as express from 'express';
import controllerMatches from '../controllers/controllerMatches';

const matches = express.Router();

matches.get('/', controllerMatches.getAllMatches);
matches.post('/', controllerMatches.createMatch);

export default matches;
