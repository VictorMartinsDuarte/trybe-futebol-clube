import { returnLbByType, sortedBoard } from '../utils/leaderboard';

const createLeaderboard = async (type: string) => {
  const leaderboard = await returnLbByType(type);
  return sortedBoard(leaderboard);
};

export default {
  createLeaderboard,
};
