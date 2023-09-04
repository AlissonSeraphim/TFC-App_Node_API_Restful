import IMatches from './IMatches';

export interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  findByMatchProgress(isInProgress: boolean): Promise<IMatches[]>
}
