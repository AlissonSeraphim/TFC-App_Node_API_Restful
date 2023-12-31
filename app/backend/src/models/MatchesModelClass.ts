import { NewEntity } from '../Interfaces';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import IMatches, { IMatchesUpdated } from '../Interfaces/IMatches';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

export default class MatchesModelClass implements IMatchesModel {
  private model = MatchesModel;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async findByMatchProgress(isInProgress: boolean): Promise<IMatches[]> {
    const whereCheck = { inProgress: isInProgress };
    const dbData = await this.model.findAll({
      where: whereCheck,
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async finishMatch(matchId: number): Promise<IMatchesUpdated[]> {
    const [affectedCount] = await this.model.update(
      { inProgress: false },
      { where: { id: matchId } },
    );
    console.log('entrou6');
    console.log('affectedCount', affectedCount);

    return [{ affectedCount }];
  }

  async updateMatch(
    matchId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatchesUpdated[]> {
    const [affectedCount] = await this.model.update(
      { homeTeamGoals,
        awayTeamGoals,
      },
      { where: { id: matchId } },
    );

    return [{ affectedCount }];
  }

  async create(data: NewEntity<IMatches>): Promise<IMatches> {
    const match = await this.model.create({
      ...data,
      inProgress: true,
    });
    console.log('match CREATE', match);
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress } = match;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }

  async getHomeTeamById(teamId: number): Promise<IMatches | null> {
    const dbData = await this.model.findOne({
      where: { homeTeamId: teamId },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }

  async getAwayTeamById(teamId: number): Promise<IMatches | null> {
    const dbData = await this.model.findOne({
      where: { awayTeamId: teamId },
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }
}
