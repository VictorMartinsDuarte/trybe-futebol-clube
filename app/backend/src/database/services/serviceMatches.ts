import Matches from '../models/Matches';
import IMatches from '../interfaces/iMatches';
import Teams from '../models/Teams';
import { ErrorTypes } from '../../errors/catalog';

const getAllMatches = async (): Promise<IMatches[]> => {
  const allMatches = await Matches.findAll({
    include: [
      { attributes: ['teamName'], model: Teams, as: 'teamHome' },
      { attributes: ['teamName'], model: Teams, as: 'teamAway' },
    ],
  });
  return allMatches as IMatches[];
};

const createMatch = async (match: IMatches): Promise<IMatches> => {
  const { homeTeam, awayTeam } = match;
  if (homeTeam === awayTeam) throw new Error(ErrorTypes.equalTeams);
  const newMatch = await Matches.create(match);
  return newMatch as IMatches;
};

const finishMatch = async (id: number) => {
  await Matches.update({ inProgress: false }, { where: { id } });
  return 'Finished';
};

export default {
  getAllMatches,
  createMatch,
  finishMatch,
};
