import { isValidArray, hasKey, isInArray } from '@univision/fe-commons/dist/utils/helpers';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';
import { getLeagueId } from '../helpers';

const noStandingsCompetitions = [
  // Copa MX Apertura
  '775',
  // Copa MX Clausura
  '598',
  // Concacaf League
  '853',
  // Liga Campeones - CONCACAF
  '549',
];

export default (data) => {
  let widgets = [];
  if (isValidArray(data.widgets)) {
    ({ widgets } = data);
  }
  // Collect the required settings needed from page data
  if (hasKey(data, 'soccerCompetitionSeason.soccerCompetition')) {
    const leagueId = getLeagueId(data.soccerCompetitionSeason);
    const widget = {
      type: widgetTypes.DEPORTES_SOCCER_BRACKETS,
      settings: {
        uid: 1,
        displayType: {
          value: 'Full',
        },
        inBracketsPhase: true,
        soccerLeague: data.soccerCompetitionSeason,
        noStandings: isInArray(leagueId, noStandingsCompetitions),
      },
    };
    return [widget, ...widgets];
  }
  return widgets;
};
