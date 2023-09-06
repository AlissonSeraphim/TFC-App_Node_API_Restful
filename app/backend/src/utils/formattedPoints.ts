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
  const winPoints = winMatches.length * 3;

  const resultObject = {
    totalPoints: winPoints + drawMatches.length,
    totalGames: teamMatches.length,
    totalVictories: winMatches.length,
    totalDraws: drawMatches.length,
    totalLosses: loseMatches.length,
    goalsFavor: goalsHomeFavor,
    goalsOwn: goalsAwayOwn,
  };

  return resultObject;
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
