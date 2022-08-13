import { returnLbByType, sortedBoard, returnHomeAndAway } from '../utils/leaderboard';

const createLeaderboard = async (type: string) => {
  const leaderboard = await returnLbByType(type);
  return sortedBoard(leaderboard);
};

const lbHomeAndAway = async () => {
  const leaderboard = await returnHomeAndAway();
  return sortedBoard(leaderboard);
};

export default {
  createLeaderboard,
  lbHomeAndAway,
};
