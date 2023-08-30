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

  public async getTeamById(id: ITeams['id']): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teamsModel.findById(id);

    if (team == null) return { status: 'NOT_FOUND', data: { message: 'Time não encontrado' } };

    return { status: 'SUCCESSFUL', data: team };
  }
}
