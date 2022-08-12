import * as express from 'express';
import controllerMatches from '../controllers/controllerMatches';
import matchesValid from '../middlewares/middleMatches';

const matches = express.Router();

matches.get('/', controllerMatches.getAllMatches);
matches.post('/', matchesValid, controllerMatches.createMatch);
matches.patch('/:id/finish', controllerMatches.finishMatch);

export default matches;
