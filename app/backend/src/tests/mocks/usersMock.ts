const userToken = {
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
}

export const createMatchBody = {
  homeTeamId: 98,
  awayTeamId: 99,
  homeTeamGoals: 7,
  awayTeamGoals: 1
}

export const sameIdTeamsBody = {
  homeTeamId: 99,
  awayTeamId: 99,
  homeTeamGoals: 7,
  awayTeamGoals: 1
}

export const createMatchMock = {
  id: 99, 
  homeTeamId: 98, 
  homeTeamGoals: 7, 
  awayTeamId: 99, 
  awayTeamGoals: 1, 
}

export const sameIdTeamsMock = {
  id: 99, 
  homeTeamId: 99, 
  homeTeamGoals: 7, 
  awayTeamId: 99, 
  awayTeamGoals: 1, 
  inProgress: true,
}


export const createMatchReturnMock = {
 ...createMatchMock,
  inProgress: true,
}

export const createMatchWithoutOneTeamBody = {
  awayTeamId: 99,
  homeTeamGoals: 7,
  awayTeamGoals: 1
}

export default userToken;