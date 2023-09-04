export default interface IMatches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesUpdated {
  affectedCount: number,
}

export interface IMatchesServiceMessage {
  message: string,
}

export interface IMatchesWithToken extends IMatches {
  userToken: { email: string },
}
