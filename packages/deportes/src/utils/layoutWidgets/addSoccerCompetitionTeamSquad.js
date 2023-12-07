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
    if (type === 'squad') {
      const widget = {
        type: widgetTypes.DEPORTES_SOCCER_TEAM_SQUAD,
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
  return widgets;
};
