import IMatches, { IMatchesUpdated } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  findByMatchProgress(isInProgress: boolean): Promise<IMatches[]>
  finishMatch: (matchId: number) => Promise<IMatchesUpdated[]>
  updateMatch: (matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) => Promise<IMatchesUpdated[]>
}
