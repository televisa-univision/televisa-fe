import { isValidArray, hasKey } from '@univision/fe-commons/dist/utils/helpers';

export default (data) => {
  let widgets = [];
  if (isValidArray(data.widgets)) {
    ({ widgets } = data);
  }
  // Collect the required settings needed from page data
  if (hasKey(data, 'soccerCompetitionSeason.soccerCompetition')) {
    const widget = {
      type: 'DeportesGridSoccerStandings',
      settings: {
        uid: 1,
        displayType: {
          value: 'Full',
        },
        highlightedCompetitionSeasons: [data.soccerCompetitionSeason],
        hasRelegation: true,
      },
    };
    return [].concat([widget], widgets);
  }
  return widgets;
};
