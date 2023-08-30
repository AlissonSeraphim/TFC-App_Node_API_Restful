import ITeams from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamsModelClass from '../models/TeamsModelClass';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new TeamsModelClass(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }
}
