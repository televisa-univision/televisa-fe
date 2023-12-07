import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isValidArray, getKey, isValidValue } from '@univision/fe-commons/dist/utils/helpers';
import tudnTheme from '@univision/fe-commons/dist/themes/tudn';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import ButtonUni from '@univision/shared-components/dist/components/v2/Button';
import { BLACK } from '@univision/fe-icons/dist/constants/colors';
import Icon from '@univision/shared-components/dist/components/Icon';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import TabName from '@univision/shared-components/dist/components/v2/TabName';
import deportes from '@univision/fe-commons/dist/config/features/deportes';
import styled from 'styled-components';
import standingsMapping from './StandingsMapping';
import StandingsLayoutStyle from './StandingsLayout.styles';
import Styles from './StandingsLayout.scss';

const ButtonMvp = styled(ButtonUni)`${StandingsLayoutStyle.buttonMvp}`;
/**
 * Standings layout view
 */
class StandingsLayout extends Component {
  /**
   * Setup the state
   * @param {Object} props for this component
   */
  constructor(props) {
    super(props);

    this.state = {
      showMore: props.showAll,
    };
  }

  /**
   * Show the rest of the standings
   */
  toggleShowMore() {
    this.setState(({ showMore }) => ({ showMore: !showMore }));
    WidgetTracker.track(WidgetTracker.events.engagement, { target: 'standings-mc-vertodos' });
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      data, showButton, showAll, leagueName, leagueId, hasRelegation, isWorldCupMVP,
    } = this.props;
    const { showMore } = this.state;
    const isMobile = getDevice(Store) === 'mobile';
    const isTudn = deportes.isTudn();
    const theme = tudnTheme();
    const headline = showButton || showAll ? leagueName : '';

    if (isValidArray(data.sections)) {
      const playedEvents = getKey(data.sections[0], ['data', 0, 'pj'], getKey(data, 'league.week', null));
      const fixture = playedEvents ? `${localization.get('week')} ${playedEvents}` : '';
      const separator = isValidValue(fixture) && isValidValue(headline) ? '-' : '';
      const content = isValidValue(separator) ? `${headline} ${separator} ${fixture}` : headline;
      const standing = standingsMapping({
        data,
        hasRelegation,
        showAll,
        showMore,
        showButton,
        isMobile,
        isTudn,
        hasToolTip: true,
        leagueId,
        isWorldCupMVP,
      });

      return (
        <div className={Styles.container}>
          <div className={classnames('row no-gutters', Styles.standingsType, {
            [Styles.tudn]: !isWorldCupMVP && isTudn,
            [Styles.tudnMvp]: isWorldCupMVP && isTudn,
          })}
          >
            {(
              <TabName
                isActive
                isTudn
                content={content}
                className={classnames(Styles.leagueHeadlineTudn, {
                  [Styles.leagueHeadlineTudnUni]: !isWorldCupMVP,
                  [Styles.leagueHeadlineTudnMvp]: isWorldCupMVP,
                })}
              />
            )}
          </div>
          {standing}
          {showButton && (
            <div className="row no-gutters">
              <div className={`col ${Styles.standingsButton}`}>
                { isWorldCupMVP ? (
                  <ButtonMvp
                    type={'seeMore'}
                    alignment={'center'}
                    onPress={() => this.toggleShowMore()}
                    icon={showMore ? 'arrowUp' : 'arrowDown'}
                    theme={theme}
                    isTudn
                    useIcon={false}
                  >
                    {showMore
                      ? localization.get('viewLessStandings').toLocaleUpperCase()
                      : localization.get('viewMoreStandings').toLocaleUpperCase()}
                    { isWorldCupMVP && <Icon name={showMore ? 'arrowUp' : 'arrowDown'} fill={BLACK} size={24} />}
                  </ButtonMvp>
                )
                  : (
                    <ButtonUni
                      type={'loadMore'}
                      alignment={'center'}
                      onPress={() => this.toggleShowMore()}
                      icon={showMore ? 'arrowUp' : 'arrowDown'}
                      theme={theme}
                      isTudn
                    >
                      {showMore
                        ? localization.get('viewLessStandings')
                        : localization.get('viewMoreStandings')}
                    </ButtonUni>
                  )
                }
              </div>
            </div>
          )}
        </div>
      );
    }
    return <div />;
  }
}

/**
 * @property {Object} data - the standings data
 * @property {string} leagueName - the league name for the standings
 * @property {string} legaueId - the league id for the standings
 * @property {bool} showButton - true if the button for expanding the table should be shown
 * @property {bool} showAll - true if we want to show the complete standings table
 * @property {bool} hasRelegation - true if we want to show relegation table
 */
StandingsLayout.propTypes = {
  data: PropTypes.object,
  leagueName: PropTypes.string,
  leagueId: PropTypes.string,
  showButton: PropTypes.bool,
  showAll: PropTypes.bool,
  hasRelegation: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
};

StandingsLayout.defaultProps = {
  data: {},
  showAll: false,
  leagueId: '',
  hasRelegation: false,
};

export default StandingsLayout;
