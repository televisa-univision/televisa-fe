import { isValidArray, hasKey, exists } from '@univision/fe-commons/dist/utils/helpers';
import * as categories from '@univision/fe-commons/dist/constants/pageCategories';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

export default (data, pageCategory) => {
  let widgets = [];
  let type = '';

  if (isValidArray(data.widgets)) {
    ({ widgets } = data);
  }
  // Collect the required settings needed from page data
  if (
    pageCategory
    && hasKey(data, 'soccerCompetitionSeason.soccerCompetition.id')
    && hasKey(data, 'soccerCompetitionSeason.seasonId')
  ) {
    // For team layout
    if (exists(data.teamId)) {
      switch (pageCategory) {
        case categories.SOCCER_TEAM_PLANTEL:
          type = 'squad';
          break;
        default:
      }
    }
    // For competitions layout
    if (pageCategory === categories.SOCCER_COMPETITION_STATS) {
      type = 'ranking';
    }
    if (type) {
      const widget = {
        type: widgetTypes.DEPORTES_GRID_EXTERNAL_SCRIPT,
        settings: {
          uid: 1,
          competition: data.soccerCompetitionSeason.soccerCompetition.id,
          season: data.soccerCompetitionSeason.seasonId,
          team: data.teamId,
          type,
        },
      };
      return [].concat([widget], widgets);
    }
  }

  // For olympics match center
  if (pageCategory === categories.OLYMPICS_MATCHCENTER) {
    type = 'olympics';
    const widget = {
      type: widgetTypes.DEPORTES_GRID_EXTERNAL_SCRIPT,
      settings: {
        uid: 2,
        type,
      },
    };
    return [].concat([widget], widgets);
  }
  return widgets;
};
