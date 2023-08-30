import ITeams from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamsModelClass implements ITeamsModel {
  private model = TeamsModel;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();

    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { teamName }: ITeams = dbData;
    return { id, teamName };
  }
}
