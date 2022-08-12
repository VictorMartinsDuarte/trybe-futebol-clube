import { Request, Response } from 'express';
import serviceMatches from '../services/serviceMatches';

const getAllMatches = async (_req: Request, res: Response) => {
  const allMatches = await serviceMatches.getAllMatches();
  return res.status(200).json(allMatches);
};

const createMatch = async (req: Request, res: Response) => {
  const newMatch = await serviceMatches.createMatch(req.body);
  return res.status(201).json(newMatch);
};

export default {
  getAllMatches,
  createMatch,
};
