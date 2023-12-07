/**
* Define top standings header abbreviaions
* @param {string} type of standing
* @returns {Object}
*/
export default function(type) {
  const settings = {
    Torneo: [
      ['Equipos', 'Equipos'],
      ['', ''],
      ['Pts', 'Puntos'],
      ['Ppj', 'Puntos Por Juego'],
      ['J', 'Partidos Jugados'],
      ['G', 'Partidos Ganados'],
      ['E', 'Partidos Empatados'],
      ['P', 'Partidos Perdidos'],
      ['GA', 'Goles a Favor'],
      ['GC', 'Goles en contra'],
      ['Dif', 'Diferencia de Goles'],
    ],
    Tournament: [
      ['Teams', 'Teams'],
      ['', ''], // empty for rank compare arrow
      ['Sp', 'Standing Points'], // standingPoints
      ['Ppg', 'Points Per Game'], // points per game
      ['Gp', 'Games Played'], // events Played
      ['Gw', 'Games won'], // wins
      ['Gt', 'Games Tied'], // ties
      ['Gl', 'Games Lost'], // losses
      ['Gf', 'Goals scored for'], // goals scored for
      ['Ga', 'Goals scored against'], // goals scored against
      ['Gd', 'Goal Difference'], // pointsDifference
    ],
    Grupo: [
      ['Grupo', 'Grupo'],
      ['', ''],
      ['Pts', 'Puntos'],
      ['J', 'Jugados'],
      ['G', 'Ganados'],
      ['E', 'Empatados'],
      ['P', 'Perdidos'],
      ['GA', 'Goles a Favor'],
      ['GC', 'Goles en contra'],
      ['Dif', 'Diferencia de Goles'],
    ],
    Group: [
      ['Teams', 'Teams'],
      ['', ''],
      ['SP', 'Standing Points'], // standingPoints
      ['GP', 'Games Played'], // events Played
      ['GW', 'Games won'], // wins
      ['GT', 'Games Tied'], // ties
      ['GL', 'Games Lost'], // losses
      ['GF', 'Goals scored for'], // goals scored for
      ['GA', 'Goals scored against'], // goals scored against
      ['GD', 'Goal Difference'], // pointsDifference
    ],
    Descenso: [
      ['Equipos', 'Equipos'],
      ['', ''],
      ['Coc', 'Cociente'],
      ['TPts', 'Total de Puntos'],
      ['TJJ', 'Total de Juegos Jugados'],
      ['Dif', 'Diferencia de Goles'],
    ],
    Relegation: [
      ['Teams', 'Teams'],
      ['', ''],
      ['RA', 'Relegation Average'],
      ['SP', 'Standing Points'],
      ['GP', 'Games Played'],
      ['GD', 'DGoal Difference'],
    ],
    Squad: [
      ['Nº', 'Número'],
      ['Nombre', 'Nombre'],
      ['Pos.', 'Posición'],
      ['Nac.', 'Nacionalidad'],
      ['Fecha', 'Fecha de Nacimiento'],
      ['Est.', 'Estatura'],
      ['Peso', 'Peso'],
    ],
    SquadGlossary: [
      ['PO', 'Portero'],
      ['MC', 'MedioCampista'],
      ['D', 'Delantero'],
    ],
  };
  // Return particular type if found
  if (typeof settings[type] !== 'undefined') {
    return settings[type];
  }
  return null;
}
