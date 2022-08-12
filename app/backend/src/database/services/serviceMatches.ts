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

const finishMatch = async (id: number) => {
  await Matches.update({ inProgress: false }, { where: { id } });
  return 'Finished';
};

const updateMatch = async (id: number, goals: Partial<IMatches>) => {
  const updatedMatch = await Matches.update(goals, { where: { id } });
  return updatedMatch;
};

export default {
  getAllMatches,
  createMatch,
  finishMatch,
  updateMatch,
};
