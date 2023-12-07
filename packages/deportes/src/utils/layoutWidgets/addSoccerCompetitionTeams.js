import { isValidArray, hasKey } from '@univision/fe-commons/dist/utils/helpers';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

export default (data) => {
  let widgets = [];
  if (isValidArray(data.widgets)) {
    ({ widgets } = data);
  }
  // Collect the required settings needed from teams page data
  if (hasKey(data, 'soccerCompetitionSeason.soccerCompetition')
      || hasKey(data, 'competitionId')) {
    const widget = {
      type: widgetTypes.DEPORTES_GRID_SOCCER_TEAMS_CRESTS,
      settings: {
        uid: 1,
        displayType: {
          value: 'Full',
        },
        soccerCompetitionSeason: data.soccerCompetitionSeason || {
          seasonId: data.seasonId,
          soccerCompetition: {
            id: data.competitionId,
            name: data.competitionTitle,
          },
        },
        styleType: 'bar',
      },
    };
    return [].concat([widget], widgets);
  }
  return widgets;
};
