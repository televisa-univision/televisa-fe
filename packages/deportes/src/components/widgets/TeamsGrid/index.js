import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import Link from '@univision/fe-components-base/dist/components/Link';
import Team from '@univision/shared-components/dist/components/v2/Team';
import Button from '@univision/shared-components/dist/components/v2/Button';
import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import getKey from '@univision/fe-utilities/helpers/object/getKey';
import { exists, locationRedirect } from '@univision/fe-commons/dist/utils/helpers';

import localization from '../../../utils/localization';
import { getActiveLeagueUri, getTudnUrl } from '../../../utils/helpers';
import StatWrapper from '../../base/StatWrapper';
import ApiError from '../../base/ApiError';
import excludeTeams from './excludeTeams';
import Styles from './TeamsGrid.styles';

const TYPE_FULL = 'Full';
const TYPE_COLLAPSED = 'Collapsed';

const TeamLinkStyled = styled(Link)`${Styles.team}`;
const TeamStyled = styled(Team)`${Styles.teamItem}`;
const TitleWrapperStyled = styled(TitleWrapper)`${Styles.title}`;
const FooterStyled = styled.div`${Styles.footer}`;
const ContainerStyled = styled.div`${Styles.container}`;

/**
 * TeamsGrid component for team's
 * @access public
 * @extends {React.Component}
 */
class TeamsGrid extends React.Component {
  /**
   * bind methods and setup component
   * @param {Object} props - the component props
   * @constructor
   */
  constructor(props) {
    super(props);

    this.showMoreHandler = this.showMoreHandler.bind(this);
    this.showAll = getKey(props.settings, 'displayType.value') !== TYPE_COLLAPSED;
  }

  /**
   * Update team's data when the component is mounted
   * @access public
   */
  componentDidMount() {
    const { getTeams } = this.props;
    getTeams();
  }

  /**
   * Get nodes of soccer teams list
   * @access public
   * @param {string} styleType design version: square or bar
   * @returns {JSX}
   */
  teamsContent(styleType = '') {
    const { teams, settings } = this.props;
    const limitItems = (getKey(settings, 'limit') || 5) + 1;

    if (!exists(teams) || exists(teams.error) || !Array.isArray(teams.data)) {
      return <ApiError className={Styles.message} />;
    }

    let teamsList = teams.data;

    if (teamsList.length === 0) {
      return <ApiError message={localization.get('noInfo')} className={Styles.message} />;
    }

    if (!this.showAll && teamsList.length > limitItems) {
      teamsList = teamsList.slice(0, limitItems);
    }
    return teamsList.filter(team => !team.fullName.match(new RegExp(excludeTeams.join('|'), 'i')))
      .sort((a, b) => a.fullName.localeCompare(b.fullName))
      .map((teamData, index) => {
        const uuid = `team${teamData.key}${index}`;
        let url = getTudnUrl(teamData.url);
        // change specific to Qatar 2022
        url = url.replace('copa-mundial', 'mundial-qatar-2022');

        return (
          <TeamLinkStyled key={uuid} href={url} className={styleType} checkUserLocation>
            <TeamStyled
              name={teamData}
              size="medium"
              layout={styleType === 'bar' ? 'left' : 'bottom'}
              className={styleType}
            />
          </TeamLinkStyled>
        );
      });
  }

  /**
   * Handle to show all teams
   * @param {Object} event - the native JS event
   * @access public
   */
  showMoreHandler(event) {
    const { settings } = this.props;
    const url = getActiveLeagueUri(getKey(settings, 'soccerCompetitionSeason'));
    event.preventDefault();

    if (typeof window !== 'undefined' && url) {
      locationRedirect(getTudnUrl(url));
    }
  }

  /**
   * Render the TeamsGrid widget
   * access public
   * @returns {JSX}
   */
  render() {
    const { settings } = this.props;
    const styleType = getKey(settings, 'styleType');
    return (
      <div className="uvs-widget teams-grid">
        <StatWrapper>
          <TitleWrapperStyled isTudn>
            <WidgetTitle isTudn>{localization.get('teams')}</WidgetTitle>
          </TitleWrapperStyled>
          <Fragment>
            <ContainerStyled className={classnames('row', styleType)}>{this.teamsContent(styleType)}</ContainerStyled>
            {!this.showAll ? (
              <FooterStyled>
                <Button type="primary" onPress={this.showMoreHandler} className="showAll">
                  {localization.get('seeMoreTeams')}
                </Button>
              </FooterStyled>
            ) : null}
          </Fragment>
        </StatWrapper>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {string} settings - the widget options
 * @property {string} settings.limit - the number of teams to display in collapsed version
 * @property {string} settings.displayType - the display type
 * @property {string} settings.soccerCompetitionSeason - the league data config
 * @property {object} teams - the initial team's data
 * @property {function} getTeams - the methods to be called to get team's data
 */
TeamsGrid.propTypes = {
  settings: PropTypes.shape({
    limit: PropTypes.number,
    displayType: PropTypes.shape({
      value: PropTypes.oneOf([TYPE_FULL, TYPE_COLLAPSED]),
    }),
    soccerCompetitionSeason: PropTypes.shape({
      seasonId: PropTypes.string,
      soccerCompetition: PropTypes.shape({
        id: PropTypes.string,
      }),
    }).isRequired,
    styleType: PropTypes.string,
  }),
  // Redux props
  teams: PropTypes.object,
  getTeams: PropTypes.func.isRequired,
};

TeamsGrid.defaultProps = {
  settings: {
    limit: 5,
    displayType: {
      value: TYPE_COLLAPSED,
    },
    soccerCompetitionSeason: {},
    styleType: 'bar',
  },
  teams: {
    data: [],
    error: false,
  },
};

export default TeamsGrid;
