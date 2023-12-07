import {
  isValidArray, hasKey, getKey, exists,
} from '@univision/fe-commons/dist/utils/helpers';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

export default (data) => {
  let widgets = [];
  const coverage = getKey(data, 'soccerCompetitionSeason.soccerCompetition.league.coverage') || '';
  if (isValidArray(data.widgets)) {
    ({ widgets } = data);
  }
  // Collect the required settings needed from page data
  if (
    hasKey(data, 'soccerCompetitionSeason.soccerCompetition.id')
    && hasKey(data, 'soccerCompetitionSeason.seasonId')
  ) {
    if (exists(data.teamId)) {
      // For team layout
      const widget = {
        type: widgetTypes.DEPORTES_GRID_EXTERNAL_SCRIPT,
        settings: {
          uid: 1,
          competition: data.soccerCompetitionSeason.soccerCompetition.id,
          season: data.soccerCompetitionSeason.seasonId,
          team: data.teamId,
          type: 'stats',
        },
      };
      if (coverage === 'Performance') {
        const widget2 = {
          type: widgetTypes.DEPORTES_GRID_EXTERNAL_SCRIPT,
          settings: {
            uid: 2,
            competition: data.soccerCompetitionSeason.soccerCompetition.id,
            season: data.soccerCompetitionSeason.seasonId,
            team: data.teamId,
            type: 'player',
          },
        };
        if (isValidArray(widgets)) {
          const firstWidget = widgets.shift();
          return [].concat([widget], [firstWidget], [widget2], widgets);
        }
        return [].concat([widget], [widget2]);
      }
      return [].concat([widget], widgets);
    }
  }
  return widgets;
};
