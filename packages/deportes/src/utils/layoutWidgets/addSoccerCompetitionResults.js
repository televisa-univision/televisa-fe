import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import * as widgetTypes from '@univision/fe-commons/dist/constants/widgetTypes';

export default (data) => {
  let widgets = [];
  let matchesWidget = null;
  const matchesDefaults = {
    type: widgetTypes.DEPORTES_GRID_SOCCER_MATCHES_RESULTS,
    settings: {
      uid: 1,
      displayType: {
        value: 'Full',
      },
    },
  };
  // Collect the required settings needed from page data
  // For soccer Person
  if (isValidObject(data?.teamSeason)) {
    if (isValidArray(data?.highlightedCompetitionSeason)) {
      matchesDefaults.settings.highlightedCompetitionSeasons = [
        data?.teamSeason?.soccerCompetitionSeason,
        ...data?.highlightedCompetitionSeason,
      ];
    } else {
      matchesDefaults.settings.soccerTeamSeason = {
        teamId: data?.teamSeason?.teamId,
        soccerCompetitionSeason: data?.teamSeason?.soccerCompetitionSeason,
      };
    }
    matchesWidget = matchesDefaults;
  }
  // For team Page
  if (hasKey(data, 'teamId')) {
    matchesDefaults.settings.soccerTeamSeason = {
      teamId: data?.teamId,
      soccerCompetitionSeason: data?.soccerCompetitionSeason,
    };
    matchesWidget = matchesDefaults;
  } else if (hasKey(data, 'soccerCompetitionSeason.soccerCompetition')) {
    matchesDefaults.settings.highlightedCompetitionSeasons = [data.soccerCompetitionSeason];
    matchesWidget = matchesDefaults;
  }
  if (matchesWidget) {
    if (isValidArray(data.widgets)) {
      ({ widgets } = data);
    }
    // return new data object
    return [].concat([matchesWidget], widgets);
  }
  return widgets;
};
