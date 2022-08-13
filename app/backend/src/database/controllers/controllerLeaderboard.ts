import { Request, Response } from 'express';
import servideLeaderboard from '../services/servideLeaderboard';

const createLeaderboard = async (req: Request, res: Response) => {
  const { originalUrl } = req;
  let type = 'all';
  if (originalUrl.includes('home')) type = 'home';
  if (originalUrl.includes('away')) type = 'away';
  const leaderboard = await servideLeaderboard.createLeaderboard(type);
  return res.status(200).json(leaderboard);
};

export default {
  createLeaderboard,
};
