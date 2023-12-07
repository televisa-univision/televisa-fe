import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '@univision/fe-icons/dist/components/Icon';
import Button from '@univision/fe-components-base/dist/components/Button';
import { DARKER_GREY, WHITE } from '@univision/fe-icons/dist/constants/colors';
import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import { hasCompetition, getLeagueShortName, getLeagueAbbrName } from '../../../utils/helpers';
import localization from '../../../utils/localization';
import Styles from './LeagueDropdown.scss';

/**
 * League Dropdown widget
 */
class LeagueDropdown extends Component {
  /**
   * Setup the state
   * @param {Object} props for this component
   */
  constructor(props) {
    super(props);
    const activeLeague = this.getLeague(props.currentLeague);
    this.state = {
      open: false,
      activeLeague,
      width: this.updateSelectWidth(activeLeague.soccerCompetition.name),
    };
    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateSelectWidth = this.updateSelectWidth.bind(this);
  }

  /* eslint camelcase: "off" */
  /* eslint-disable react/sort-comp */
  /**
   * Update selected league when received new props
   * @param {Object} nextProps the new props received
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    /* eslint-disable react/destructuring-assignment */
    const { soccerCompetition } = this.state.activeLeague;

    if (nextProps.currentLeague !== soccerCompetition.id) {
      const activeLeague = this.getLeague(nextProps.currentLeague);

      this.setState({
        activeLeague,
        width: this.updateSelectWidth(activeLeague.soccerCompetition.name),
      });
    }
  }

  /**
   * Get data of current League
   * @param {string} id the league id to get the name from
   * @returns {Object} the league data
   */
  getLeague(id) {
    const { defaultLabel, leagues } = this.props;
    let league;

    if (id && Array.isArray(leagues) && leagues.length > 0) {
      league = leagues.filter(content => getKey(content, 'soccerCompetition.id') === `${id}`);
      league = Array.isArray(league) && league.length && league[0];
    }

    return (
      league || {
        soccerCompetition: {
          name: defaultLabel || localization.get('moreLeagues'),
          id: '0',
        },
      }
    );
  }

  /**
   * Update the components state (on mobile)
   * @param {event} event value of the on change event
   * @param {Object} [league] the league data
   */
  handleChange(event, league) {
    const { nativeEvent } = event;
    let activeLeague = league;

    if (!activeLeague) {
      const leagueId = event.target.value;
      activeLeague = this.getLeague(leagueId);
    }

    this.setState(
      {
        activeLeague,
        open: false,
        width: this.updateSelectWidth(activeLeague.soccerCompetition.name),
      },
      () => {
        this.props.onChange(nativeEvent, activeLeague);
      }
    );
  }

  /**
   * Open drop down (for desktop)
   */
  toggleOpen() {
    this.setState(({ open }) => ({ open: !open }));
  }

  /**
   * Handle selected Option
   * @param {string} text The name of the league
   * @returns {number} the new size for the select
   */
  updateSelectWidth = (text) => {
    return text.length * 10 + 60;
  };

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      leagues, className, isBlack, isTudn, isWorldCupMVP, isRebrandMatches,
    } = this.props;
    const { open, width, activeLeague } = this.state;
    const { soccerCompetition } = activeLeague;
    const isInactive = soccerCompetition.id === '0' || (soccerCompetition.id !== '0' && open);
    const styleMvp = isWorldCupMVP ? Styles.activeLeague : Styles.activeLeague;
    const activeStyle = !isInactive ? styleMvp : '';
    const mobileContent = [];
    const desktopContent = [];
    const fillArrow = isRebrandMatches ? WHITE : DARKER_GREY;
    if (!isValidArray(leagues)) {
      return null;
    }

    // Dropdown content by platform
    leagues.forEach((content) => {
      if (hasCompetition(content)) {
        mobileContent.push(
          <option
            value={content.soccerCompetition.id}
            key={`mobile${content.soccerCompetition.id}`}
            name={content.soccerCompetition.name}
          >
            {getLeagueAbbrName(content)}
          </option>
        );
        desktopContent.push(
          <Button
            className={classnames(Styles.item, `key${content.soccerCompetition.id}`, { [Styles.tudn]: isTudn })}
            plain
            key={`desk${content.soccerCompetition.id}`}
            onClick={event => this.handleChange(event, content)}
            isTudn
          >
            {content.soccerCompetition.name}
          </Button>
        );
      }
    });

    if (!isValidArray(mobileContent) && !isValidArray(desktopContent)) {
      return null;
    }

    return (
      <div
        className={classnames(`${className} ${Styles.container} ${activeStyle}`, {
          [Styles.blackType]: isBlack && !isTudn,
          [Styles.tudnType]: isTudn,
          [Styles.rebrandButton]: isRebrandMatches,
        })}
      >
        <div className={classnames(Styles.selectDesktop, activeStyle,
          { [Styles.condensed]: isTudn })}
        >
          <Button
            className={classnames(Styles.topButton,
              { [Styles.active]: open, [Styles.tudn]: isTudn, [Styles.tudnMvp]: isWorldCupMVP })
            }
            plain={!isTudn}
            data-id={soccerCompetition.id}
            onClick={this.toggleOpen}
            isTudn={isTudn}
          >
            {getLeagueShortName({ soccerCompetition })}
            <Icon name="arrowDown" size="small" className={Styles.downArrow} fill={fillArrow} />
          </Button>
          <div className={classnames(Styles.dropDownList, { [Styles.open]: open })}>
            {desktopContent}
          </div>
        </div>
        <div className={classnames(Styles.selectMobile, activeStyle,
          { [Styles.condensed]: isTudn })}
        >
          <select
            className={classnames({ [Styles.tudn]: isTudn, [Styles.tudnMvp]: isWorldCupMVP })}
            value={soccerCompetition.id}
            onChange={this.handleChange}
            style={!isBlack ? { width } : null}
          >
            {JSON.stringify(isWorldCupMVP)}
            {isInactive ? (
              <option value={soccerCompetition.id} name={soccerCompetition.name} disabled hidden>
                {soccerCompetition.name}
              </option>
            ) : null}

            {mobileContent}
          </select>
          <Icon name="arrowDown" size="small" className={Styles.downArrow} />
        </div>
      </div>
    );
  }
}

/**
 * propTypes
 * @property {Object} leagues the leagues to dropdown
 * @property {Object} leagues.soccerCompetition the soccer competition from API
 * @property {string} leagues.soccerCompetition.name the league name
 * @property {string} leagues.soccerCompetition.id the league ID
 * @property {string} [currentLeague] the ID league active
 * @property {string} [defaultLabel] an text to initial dropdown label
 * @property {string} [className] a custom class name
 * @property {Function} [onChange] the callback when change of league
 * @property {boolean} [isBlack] is true use the black type flavor
 * @property {boolean} [isTudn] is true use the tudn type flavor
 */
LeagueDropdown.propTypes = {
  leagues: PropTypes.arrayOf(
    PropTypes.shape({
      soccerCompetition: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
      }).isRequired,
    })
  ),
  currentLeague: PropTypes.string,
  defaultLabel: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  isBlack: PropTypes.bool,
  isTudn: PropTypes.bool,
  isWorldCupMVP: PropTypes.bool,
  isRebrandMatches: PropTypes.bool,
};

/**
 * Default Prop Values
 */
LeagueDropdown.defaultProps = {
  leagues: [],
  onChange: () => {},
};

export default LeagueDropdown;
