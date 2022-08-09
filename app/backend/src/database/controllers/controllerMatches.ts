import { Request, Response } from 'express';
import serviceMatches from '../services/serviceMatches';

const getAllMatches = async (_req: Request, res: Response) => {
  const allMatches = await serviceMatches.getAllMatches();
  return res.status(200).json(allMatches);
};

export default {
  getAllMatches,
};
