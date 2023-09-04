import MatchesModelClass from '../models/MatchesModelClass';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import IMatches, { IMatchesServiceMessage, IMatchesWithToken } from '../Interfaces/IMatches';
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

  public async updateMatch(
    matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
    userToken: { email: string },
  ): Promise<ServiceResponse<IMatchesServiceMessage>> {
    const matchesUpdated = await this.matchesModel.updateMatch(
      matchId,
      homeTeamGoals,
      awayTeamGoals,
    );

    console.log('matchesUpdated', matchesUpdated);

    if (!userToken.email) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(data: IMatchesWithToken): Promise<ServiceResponse<IMatches>> {
    const { userToken } = data;

    if (!userToken.email) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }

    const match = await this.matchesModel.create(data);

    return { status: 'CREATED', data: match };
  }
}
