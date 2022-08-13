import Matches from '../models/Matches';
import serviceTeams from '../services/serviceTeams';
import ILeaderboard from '../interfaces/iLeaderboard';
import IMatches from '../interfaces/iMatches';

const matchesPoints = (homeTeamGoals: number, awayTeamGoals: number, type: string) => {
  if (homeTeamGoals === awayTeamGoals) return 1;
  if (type === 'home') {
    if (homeTeamGoals > awayTeamGoals) return 3;
    return 0;
  }
  if (type === 'away') {
    if (awayTeamGoals > homeTeamGoals) return 3;
    return 0;
  }
  return 0;
};

const teamEfficiency = (totalPoints: number, totalGames: number) => {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return Number(efficiency.toFixed(2));
};

const returnFinishedMatches = async () => await Matches
  .findAll({ where: { inProgress: false } });

const returnFavor = (home: number, away: number, type: string) => {
  if (type === 'home') return home;
  return away;
};

const returnOwn = (home: number, away: number, type: string) => {
  if (type === 'home') return away;
  return home;
};

const filterByType = (matches: IMatches[], id:number, type: string) => {
  if (type === 'away') {
    return matches.filter(({ awayTeam }) => awayTeam === id);
  } else if (type === 'home') {
    return matches.filter(({ homeTeam }) => homeTeam === id);
  } else { return matches };
};

export const returnLbByType = async (type: string) => {
  const matches = await returnFinishedMatches();
  const teams = await serviceTeams.getAllTeams();

  const lbResult: ILeaderboard[] = teams.map(({ id, teamName }) => {
    let totalPoints = 0;
    let totalGames = 0;
    let totalVictories = 0;
    let totalDraws = 0;
    let totalLosses = 0;
    let goalsFavor = 0;
    let goalsOwn = 0;
    let goalsBalance = 0;
    let efficiency = 0;
    let filtered = filterByType(matches, id, type);

    filtered.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      const points = matchesPoints(homeTeamGoals, awayTeamGoals, type);
      totalPoints += points;
      totalVictories += (points === 3 ? 1 : 0);
      totalDraws += (points === 1 ? 1 : 0);
      totalLosses += (points === 0 ? 1 : 0);
      goalsFavor += returnFavor(homeTeamGoals, awayTeamGoals, type);
      goalsOwn += returnOwn(homeTeamGoals, awayTeamGoals, type);
    });
    totalGames = filtered.length;
    goalsBalance = goalsFavor - goalsOwn;
    efficiency = teamEfficiency(totalPoints, totalGames);
    return {
      name: teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    };
  });
  return lbResult;
};

export const sortedBoard = (learderboard: ILeaderboard[]) => {
  const orderedBoard = learderboard.sort((a, b) => {
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalVictories > b.totalVictories) return -1;
    if (a.totalVictories < b.totalVictories) return 1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    if (a.goalsOwn < b.goalsOwn) return 1;
    if (a.goalsOwn > b.goalsOwn) return -1;
    return 0;
  });
  return orderedBoard;
};
