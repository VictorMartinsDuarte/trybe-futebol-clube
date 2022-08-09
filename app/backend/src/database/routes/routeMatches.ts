import * as express from 'express';
import controllerMatches from '../controllers/controllerMatches';

const matches = express.Router();

matches.get('/', controllerMatches.getAllMatches);

export default matches;
