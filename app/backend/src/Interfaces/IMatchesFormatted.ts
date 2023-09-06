import IMatches from './IMatches';

export default interface IMatchesFormatted {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}

export interface IMatchesFormattedWithEfficiency extends IMatchesFormatted {
  goalsBalance: number,
  efficiency: number,
}

export interface IMatchesFormattedPointsWithoutName {
  teamMatches:IMatches[],
  winMatches:IMatches[],
  drawMatches:IMatches[],
  loseMatches:IMatches[],
  goalsHomeFavor:number,
  goalsAwayOwn:number,
  winPoints:number,
}
