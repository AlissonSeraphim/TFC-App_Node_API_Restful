import MatchesModelClass from '../models/MatchesModelClass';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import IMatches, { IMatchesServiceMessage } from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModelClass(),
  ) { }

  public async getAllMatches(): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matchesModel.findAll();

    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async getMatchesByProgress(isInProgress: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matchesByProgress = await this.matchesModel.findByMatchProgress(isInProgress);

    return { status: 'SUCCESSFUL', data: matchesByProgress };
  }

  public async finishMatch(matchId: number): Promise<ServiceResponse<IMatchesServiceMessage>> {
    const matchesUpdated = await this.matchesModel.finishMatch(matchId);

    if (matchesUpdated[0].affectedCount === 0) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
