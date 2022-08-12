import * as express from 'express';
import controllerMatches from '../controllers/controllerMatches';

const matches = express.Router();

matches.get('/', controllerMatches.getAllMatches);
matches.post('/', controllerMatches.createMatch);
matches.patch('/:id/finish', controllerMatches.finishMatch);

export default matches;
