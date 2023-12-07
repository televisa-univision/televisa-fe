import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import getUrlParam from '@univision/fe-utilities/helpers/url/getUrlParam';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import GatsbyInjector from '@univision/fe-components-base/dist/components/widgets/GatsbyInjector';
import features from '@univision/fe-commons/dist/config/features';

import WithSelectiveAd from '../../utils/WithSelectiveAd';
import Styles from './ExternalScriptWrapper.scss';

/**
 * Sport Loadable embedded widget
 * @param {Object} props The details for the widgets to load
 * @returns {JSX}
 */
const ExternalScriptWrapper = (props) => {
  let {
    type, season, competition, team, match, teamCompare,
  } = props;
  /* eslint-disable react/destructuring-assignment */
  if (exists(props.settings)) {
    ({
      type, season, competition, team, match, teamCompare,
    } = props.settings);
  }
  let path;
  let params = [
    { prop: 'width', value: '100%' },
    { prop: 'competition', value: competition },
    { prop: 'season', value: season },
  ];

  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const tudnPath = `_tudn${isWorldCupMVP && type === 'compareHeatmap' ? '_rebrand' : ''}`;
  switch (type) {
    case 'squad':
      path = 'https://static.univision.com/fragments/deportes/opta-widgets/soccer-team-squad.html';
      params = [...params, { prop: 'team', value: team }];
      break;

    case 'stats':
      path = `https://static.univision.com/fragments/deportes/opta-widgets/soccer-team-stats_new${tudnPath}.html`;
      params = [...params, { prop: 'team', value: team }];
      break;

    case 'playerStats':
      path = 'https://static.univision.com/fragments/deportes/opta-widgets/season-player-stats.html';
      params = [...params, { prop: 'team', value: team }];
      break;

    case 'player':
      path = `http://static.univision.com/fragments/deportes/opta-widgets/soccer-player-ranking${tudnPath}.html`;
      params = [...params, { prop: 'team', value: team }];
      break;

    case 'heatmap':
      path = 'https://static.univision.com/fragments/deportes/opta-widgets/soccer-heatmap.html';
      params = [...params, { prop: 'match', value: match }];
      break;

    case 'teamCompare':
      path = 'https://static.univision.com/fragments/deportes/opta-widgets/soccer-team-comparison.html';
      params = [
        { prop: 'width', value: '100%' },
        { prop: 'competition', value: `${competition},${competition}` },
        { prop: 'season', value: `${season},${season}` },
        { prop: 'team', value: teamCompare },
      ];
      break;

    case 'compareHeatmap':
      path = `https://static.univision.com/fragments/deportes/opta-widgets/soccer-heatmap_mas_comparison${tudnPath}.html`;
      params = [
        { prop: 'width', value: '100%' },
        { prop: 'competition', value: competition },
        { prop: 'season', value: season },
        { prop: 'match', value: match },
        { prop: 'competition_comparison', value: `${competition},${competition}` },
        { prop: 'season_comparison', value: `${season},${season}` },
        { prop: 'team', value: teamCompare },
        { prop: 'isWorldCupMVP', value: isWorldCupMVP },
      ];
      break;

    case 'olympics':
      path = 'https://static.univision.com/fragments/deportes/olimpiadas-matchcenter/index.html';
      params = [
        { prop: 'channel', value: getUrlParam('channel') },
      ];
      break;

    case 'ranking':
    default:
      path = `https://static.univision.com/fragments/deportes/opta-widgets/soccer-league-ranking${tudnPath}.html`;
      break;
  }
  return (
    <div className={classnames('uvs-widget', Styles[type])}>
      <GatsbyInjector path={path} params={params} />
    </div>
  );
};

/**
 * propTypes
 * @property {bool} competition - the competition id
 * @property {string} match - the match ID
 * @property {string} season - the season id
 * @property {Object} settings - the settings
 * @property {string} team - team key
 * @property {string} teamCompare - two team id's separated by a comma
 * @property {string} type - the type of widget to load
 */
ExternalScriptWrapper.propTypes = {
  competition: PropTypes.string,
  match: PropTypes.string,
  season: PropTypes.string,
  settings: PropTypes.object,
  team: PropTypes.string,
  teamCompare: PropTypes.string,
  type: PropTypes.string,
};

export default WithSelectiveAd(ExternalScriptWrapper);
