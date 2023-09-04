import IMatches, { IMatchesUpdated } from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  findByMatchProgress(isInProgress: boolean): Promise<IMatches[]>
  finishMatch: (matchId: number) => Promise<IMatchesUpdated[]>
}
