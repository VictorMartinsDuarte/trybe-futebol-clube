import * as express from 'express';
import controllerMatches from '../controllers/controllerMatches';
import matchesValid from '../middlewares/middleMatches';
import tokenValid from '../middlewares/middleToken';

const matches = express.Router();

matches.get('/', controllerMatches.getAllMatches);
matches.post('/', matchesValid, tokenValid, controllerMatches.createMatch);
matches.patch('/:id/finish', controllerMatches.finishMatch);
matches.patch('/:id', controllerMatches.updateMatch);

export default matches;
