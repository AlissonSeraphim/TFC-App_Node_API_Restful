import { IMatchesModel } from '../Interfaces/IMatchesModel';
import IMatches from '../Interfaces/IMatches';
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
    const whereCheck = isInProgress !== undefined ? { inProgress: isInProgress } : {};
    const dbData = await this.model.findAll({
      where: whereCheck,
      include: [
        { model: TeamsModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return dbData;
  }
}
