import { IMatchesFormattedWithEfficiency } from '../Interfaces/IMatchesFormatted';
import IMatches from '../Interfaces/IMatches';

type Params = {
  idTeam: number;
  matches: IMatches[];
};

export const homeMatches = ({ idTeam, matches }: Params) => {
  const teamMatches = matches.filter((match) => match.homeTeamId === idTeam);
  const winMatches = teamMatches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  const drawMatches = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  const loseMatches = teamMatches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
  const goalsHomeFavor = teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  const goalsAwayOwn = teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  const efficiencyPoints = parseFloat(((((winMatches.length * 3) + drawMatches.length)
  / (teamMatches.length * 3)) * 100).toFixed(2));

  return { totalPoints: (winMatches.length * 3) + drawMatches.length,
    totalGames: teamMatches.length,
    totalVictories: winMatches.length,
    totalDraws: drawMatches.length,
    totalLosses: loseMatches.length,
    goalsFavor: goalsHomeFavor,
    goalsOwn: goalsAwayOwn,
    goalsBalance: goalsHomeFavor - goalsAwayOwn,
    efficiency: efficiencyPoints,
  };
};

export const awayMatches = ({ idTeam, matches }: Params) => {
  const teamMatches = matches.filter((match) => match.awayTeamGoals === idTeam);
  const winMatches = teamMatches.filter((match) => match.awayTeamGoals > match.homeTeamGoals);
  const drawMatches = teamMatches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  const goalsAwayFavor = teamMatches.reduce((acc, match) => acc + match.awayTeamGoals, 0);
  const goalsHomeOwn = teamMatches.reduce((acc, match) => acc + match.homeTeamGoals, 0);
  const winPoints = winMatches.length * 3;

  return { winPoints, goalsAwayFavor, goalsHomeOwn, drawMatches };
};

export const sortTeams = (teams:
IMatchesFormattedWithEfficiency[]):
IMatchesFormattedWithEfficiency[] => teams.sort((teamA, teamB) => {
  if (teamB.totalPoints !== teamA.totalPoints) {
    return teamB.totalPoints - teamA.totalPoints;
  }

  if (teamB.totalVictories !== teamA.totalVictories) {
    return teamB.totalVictories - teamA.totalVictories;
  }

  if (teamB.goalsBalance !== teamA.goalsBalance) {
    return teamB.goalsBalance - teamA.goalsBalance;
  }

  if (teamB.goalsFavor !== teamA.goalsFavor) {
    return teamB.goalsFavor - teamA.goalsFavor;
  }

  return 0;
});
