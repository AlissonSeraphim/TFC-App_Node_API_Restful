import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const { inProgress } = _req.query;

    let serviceResponse;

    console.log('inProgress', inProgress);

    if (inProgress !== undefined) {
      const inProgressStatus = inProgress === 'true';
      console.log('inProgressStatus', inProgressStatus);
      serviceResponse = await this.matchesService.getMatchesByProgress(inProgressStatus);
    } else {
      serviceResponse = await this.matchesService.getAllMatches();
    }

    res.status(mapStatusHTTP('SUCCESSFUL')).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchesService.finishMatch(Number(id));

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}
