import Matches from '../models/Matches';
import IMatches from '../interfaces/iMatches';
import Teams from '../models/Teams';

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
  const newMatch = await Matches.create(match);
  return newMatch as IMatches;
};

export default {
  getAllMatches,
  createMatch,
};
