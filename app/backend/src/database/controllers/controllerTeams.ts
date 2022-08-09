import { Request, Response } from 'express';
import serviceTeams from '../services/serviceTeams';

const getAllTeams = async (_req: Request, res: Response): Promise<Response> => {
  const allTeams = await serviceTeams.getAllTeams();
  return res.status(200).json(allTeams);
};

const getTeamById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const teamById = await serviceTeams.getTeamById(Number(id));
  return res.status(200).json(teamById);
};

export default {
  getAllTeams,
  getTeamById,
};
