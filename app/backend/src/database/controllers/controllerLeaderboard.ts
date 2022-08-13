import { Request, Response } from 'express';
import serviceLeaderboard from '../services/servideLeaderboard';

const createLeaderboard = async (req: Request, res: Response) => {
  const { originalUrl } = req;
  let type = 'all';
  if (originalUrl.includes('home')) type = 'home';
  if (originalUrl.includes('away')) type = 'away';
  const leaderboard = await serviceLeaderboard.createLeaderboard(type);
  return res.status(200).json(leaderboard);
};

const lbHomeAndAway = async (_req: Request, res: Response) => {
  const leaderboard = await serviceLeaderboard.lbHomeAndAway();
  return res.status(200).json(leaderboard);
};

export default {
  createLeaderboard,
  lbHomeAndAway,
};
