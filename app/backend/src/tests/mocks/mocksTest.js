const mockTest = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo'
    },
    awayTeam: {
      teamName: 'Grêmio'
    }
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Internacional'
    },
    awayTeam: {
      teamName: 'Santos'
    }
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Corinthians'
    },
    awayTeam: {
      teamName: 'Napoli-SC'
    }
  },
  {
    id: 4,
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: false,
    homeTeam: {
      teamName: 'Botafogo'
    },
    awayTeam: {
      teamName: 'Bahia'
    }
  },
  {
    id: 5,
    homeTeamId: 7,
    homeTeamGoals: 1,
    awayTeamId: 10,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'Flamengo'
    },
    awayTeam: {
      teamName: 'Minas Brasília'
    }
  },
]

    // Armazenar cada um dos times em objeto no fomato { teamName: 'flamengo', teamId: 1 }
    const test = () => {
      const getTeams = mockTest.map((match) => {
        return {
          teamName: match.homeTeam.teamName,
          teamId: match.homeTeamId
        }
      })
  
  
      return getTeams;
    }

    console.log(test());