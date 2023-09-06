import MatchesModelClass from '../models/MatchesModelClass';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import IMatches, { IMatchesServiceMessage, IMatchesWithToken } from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesFormatted from '../Interfaces/IMatchesFormatted';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsModelClass from '../models/TeamsModelClass';
import { homeMatches } from '../utils/formattedPoints';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModelClass(),
    private teamsModel: ITeamsModel = new TeamsModelClass(),
    private invalidToken: string = 'Token must be a valid token',
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
      return { status: 'UNAUTHORIZED', data: { message: this.invalidToken } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatch(
    matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
    userToken: { email: string },
  ): Promise<ServiceResponse<IMatchesServiceMessage>> {
    if (!userToken.email) {
      return { status: 'UNAUTHORIZED', data: { message: this.invalidToken } };
    }

    const matchesUpdated = await this.matchesModel.updateMatch(
      matchId,
      homeTeamGoals,
      awayTeamGoals,
    );

    console.log('matchesUpdated', matchesUpdated);

    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async createMatch(data: IMatchesWithToken): Promise<ServiceResponse<IMatches>> {
    const { userToken, homeTeamId, awayTeamId } = data;

    if (!userToken.email) {
      return { status: 'UNAUTHORIZED', data: { message: this.invalidToken } };
    }

    const haveHomeTeam = await this.matchesModel.getHomeTeamById(homeTeamId);
    const haveAwayTeam = await this.matchesModel.getAwayTeamById(homeTeamId);

    if (!haveHomeTeam || !haveAwayTeam) {
      console.log('createMatch2');
      return { status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' } };
    }

    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE_ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const match = await this.matchesModel.create(data);

    return { status: 'CREATED', data: match };
  }

  public async getTeamsPoints(): Promise<ServiceResponse<IMatchesFormatted[]>> {
    const allMatches = await this.matchesModel.findAll();
    const allTeams = await this.teamsModel.findAll();

    const allMatchesFormatted = allTeams.map((team) => {
      const { id, teamName } = team;
      const teamObj = { idTeam: id, matches: allMatches };
      const formattedHomePoints = homeMatches(teamObj);
      return {
        name: teamName,
        ...formattedHomePoints,
      };
    });

    return { status: 'SUCCESSFUL', data: allMatchesFormatted };
  }
}
