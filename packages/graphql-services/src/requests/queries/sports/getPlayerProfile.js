const query = `
  query ($playerId: String!, $seasonId: String!, $teamId: String!) {
    getPlayerProfile(
      playerId: $playerId
      seasonId: $seasonId
      teamId: $teamId
    ) {
      age,
      dateOfBirth,
      height,
      id,
      name,
      nationality,
      picture,
      positionRegular,
      team {
        id,
        name,
        abbreviation,
        logo,
        url,
      },
      uniformNumber,
      url,
      weight
    }
  }
  `;

export default query;
