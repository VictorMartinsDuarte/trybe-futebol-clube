import { Request, Response, NextFunction } from 'express';
import { ErrorTypes } from '../../errors/catalog';
import 'express-async-errors';
import Matches from '../models/Matches';

const matchesValid = async (req: Request, _res: Response, next: NextFunction) =>{
  const { homeTeam, awayTeam } = req.body;
  if (homeTeam === awayTeam) throw new Error(ErrorTypes.equalTeams);
  const matches = await Matches.findAll({ where: { id: [homeTeam, awayTeam] } });
  if (matches.length < 2) throw new Error(ErrorTypes.teamDontExist);
  next();
};

export default matchesValid;