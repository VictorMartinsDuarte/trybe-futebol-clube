import Teams from '../models/Teams';
import ITeam from '../interfaces/iTeams';

const getAllTeams = async (): Promise<ITeam[]> => {
  const allTeams = await Teams.findAll();
  return allTeams as ITeam[];
};

const getTeamById = async (teamId: number): Promise<ITeam> => {
  const teamById = await Teams.findByPk(teamId);
  return teamById as ITeam;
};

export default {
  getAllTeams,
  getTeamById,
};
