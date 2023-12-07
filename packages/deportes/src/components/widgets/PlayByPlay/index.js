import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import Button from '@univision/shared-components/dist/components/v2/Button';
import PlayByPlayCard from '@univision/shared-components/dist/components/v3/PlayByPlayCard';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import AdProxy from '@univision/fe-commons/dist/components/ads/dfp/AdProxy';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import hasKey from '@univision/fe-utilities/helpers/object/hasKey';

import { DEEP_SEA } from '@univision/fe-utilities/styled/constants';
import localization from '../../../utils/localization';
import soccerMatchNavDefinitions from '../../../utils/layoutWidgets/matchCenter/soccerMatchNavDefinitions';
import SoccerMatchNavContext from '../../base/SoccerMatchNav/SoccerMatchNavContext';
import StatWrapper from '../../base/StatWrapper';
import Styles from './PlayByPlay.scss';

/**
 * Play by Play may component to wrap cards and handle load more event
 */
class PlayByPlay extends React.PureComponent {
  /**
   * Main constructor
   * @param {Object} props for this component
   * @param {Object} context react context from parent component
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      collapsed: true,
    };
    this.changeStatus = this.changeStatus.bind(this);
    this.timer = null;
    this.status = {
      closed: {
        icon: 'arrowDown',
        message: localization.get('showMore'),
      },
      open: {
        icon: 'arrowUp',
        message: localization.get('showLess'),
      },
    };
  }

  /**
   * componentDidMount method
   */
  componentDidMount() {
    const { getEvents } = this.props;
    if (getEvents) {
      getEvents();
      this.startInterval();
    }
  }

  /**
   * Stop timer when the game status change
   * @param {Object} prevProps - the previous props data
   */
  componentDidUpdate(prevProps) {
    const { activeGame } = this.props;
    this.startInterval();
    if (prevProps.activeGame !== activeGame && !activeGame) {
      this.stopInteval();
    }
  }

  /**
   * Clear the timer on unmount
   */
  componentWillUnmount() {
    this.stopInteval();
  }

  /**
   * Logic to check how many items to show depending on video items
   * @param {array} events to be displayed
   * @returns {number}
   */
  getPreviewItemsNumber(events) {
    const { preview } = this.props;
    if (preview) {
      return preview;
    }
    const defaultWithVideo = 9;
    const defaultWithoutVideo = 10;
    let previewNumber = defaultWithoutVideo;
    if (events && Array.isArray(events) && events.length > 0) {
      const firstItems = events.slice(0, 10).filter(item => item.image);
      if (firstItems.length > 0) {
        previewNumber = defaultWithVideo;
      }
    }
    return previewNumber;
  }

  /**
   * Load more event
   */
  changeStatus() {
    const { collapsed: collapsedState } = this.state;
    if (collapsedState) {
      WidgetTracker.track(WidgetTracker.events.engagement, { target: 'playbyplay-vertodos' });
    } else {
      WidgetTracker.track(WidgetTracker.events.engagement, { target: 'playbyplay-vermenos' });
    }
    this.setState({ collapsed: !collapsedState });
  }

  /**
   * Start interval to refresh do callback
   */
  startInterval() {
    const { activeGame, interval, getEvents } = this.props;
    if (getEvents && isValidFunction(getEvents) && activeGame && !this.timer) {
      this.timer = setInterval(getEvents, interval * 1000);
    }
  }

  /**
   * Stop refresh interval
   */
  stopInteval() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  /**
   * Main render function
   * @returns {JSX}
   */
  render() {
    let toRender = <div className={Styles.message}>{localization.get('noEvents')}</div>;
    const {
      props: {
        header,
        events,
        settings,
        theme,
        widgetContext: { isWorldCupMVP },
      },
      state: { collapsed },
      context,
    } = this;

    if (!isValidArray(events)) {
      return null;
    }
    if (context?.setNavigationItem) {
      context.setNavigationItem(soccerMatchNavDefinitions.COMMENTARY);
    }

    const previewItemsNumber = this.getPreviewItemsNumber(events);
    let eventsToShow = events;
    let status = this.status.open;
    if (collapsed) {
      eventsToShow = events.slice(0, previewItemsNumber);
      status = this.status.closed;
    }
    toRender = eventsToShow.map((event, index) => (
      <Fragment key={event.key}>
        <PlayByPlayCard
          {...event}
          showTimeline={index !== eventsToShow.length - 1}
        />
      </Fragment>
    ));
    return (
      <>
        <div className="uvs-widget row">
          <div className="col-md-8">
            <StatWrapper>
              {hasKey(this, 'props.header.title') && (
                <TitleWrapper
                  theme={theme}
                  className={classnames(Styles.title, Styles.tudn)}
                  isTudn
                >
                  <WidgetTitle
                    isTudn
                    isLowerCase={isWorldCupMVP}
                    fontColor={isWorldCupMVP && DEEP_SEA}
                  >
                    {header.title}
                  </WidgetTitle>
                </TitleWrapper>
              )}
              {toRender}
            </StatWrapper>
            {events.length > previewItemsNumber && (
              <Button
                type="loadMore"
                alignment="center"
                onPress={this.changeStatus}
                icon={status.icon}
                theme={theme}
                isTudn
                isActive={!isWorldCupMVP}
                isWorldCupMVP
                className={classnames(Styles.buttonTudn, { [Styles.buttonRebrand]: isWorldCupMVP })}
              >
                {status.message}
              </Button>
            )}
          </div>
          <div className="col-md-4">
            <div className={Styles.filler} />
          </div>
        </div>
        <AdProxy className="uvs-ad-widget" {...settings?.widgetAd} />
      </>
    );
  }
}

PlayByPlay.propTypes = {
  activeGame: PropTypes.bool,
  events: PropTypes.array,
  getEvents: PropTypes.func,
  header: PropTypes.object,
  settings: PropTypes.shape({
    widgetAd: PropTypes.shape({
      type: PropTypes.string,
    }),
  }),
  theme: PropTypes.object,
  preview: PropTypes.number,
  interval: PropTypes.number, // seconds to call getEvents
  widgetContext: PropTypes.shape({
    isWorldCupMVP: PropTypes.bool,
  }),
};

PlayByPlay.defaultProps = {
  interval: 60,
  activeGame: false,
  header: {
    title: localization.get('commentaries'),
  },
  widgetContext: {},
};

PlayByPlay.contextType = SoccerMatchNavContext;

export default PlayByPlay;
