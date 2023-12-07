import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  NETWORK_UNIMAS,
  NETWORK_UNIVISION,
  NETWORK_UDN,
  NETWORK_GALAVISION,
  NETWORK_DIGITAL,
  SELECT_ALL,
} from '@univision/fe-commons/dist/constants/tvGuide';
import localization from '@univision/fe-commons/dist/utils/localization/deportes';
import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import TVGuidePlaceholder from '@univision/fe-components-base/dist/components/Placeholder/tvGuideCards';
import Styles from './TvGuide.scss';
import FilterTabMenu from '../../base/FilterTabMenu';
import TvGuideNav from '../../base/TvGuideNav';
import TvGuideEvent from '../../base/TvGuideEvent';
import TvGuideDateNav from '../../base/TvGuideDateNav';
import { filterTypes } from '../../base/FilterTabMenu/helper';

const channelNav = [
  NETWORK_DIGITAL,
  NETWORK_UNIVISION,
  NETWORK_UDN,
  NETWORK_GALAVISION,
  NETWORK_UNIMAS,
];

/**
 * TV Guide component - sample component
 * @access public
 * @extends {React.Component}
 */
class TvGuide extends React.PureComponent {
  /**
   * Setup the state
   *  @param {Object} props for this component
   */
  constructor(props) {
    super(props);
    this.channelHandler = this.channelHandler.bind(this);
    this.contentTypeHandler = this.contentTypeHandler.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
  }

  /**
   * Update soccer matches data after component was mount
   * @access public
   */
  componentDidMount() {
    const {
      setChannel,
      getAllEvents,
      channel,
      setDate,
    } = this.props;
    if (typeof setDate === 'function') {
      setDate(new Date());
    }

    if (typeof setChannel === 'function') {
      setChannel(channel);
    }

    if (typeof getAllEvents === 'function') {
      getAllEvents();
    }
  }

  /**
   * Check if the component should update when have valid data
   * or the props/state changed
   * @param {string} channel - the new props data
   */
  channelHandler(channel) {
    const {
      setChannel,
      getAllEvents,
    } = this.props;
    if (typeof setChannel === 'function') {
      setChannel(channel);
    }
    if (typeof getAllEvents === 'function') {
      getAllEvents();
    }
  }

  /**
   * Change active filter
   * @param {Object} event - the js event
   * @param {string} type - type of content
   */
  contentTypeHandler(event, type) {
    event.preventDefault();
    const {
      setContent,
    } = this.props;
    if (typeof setContent === 'function') {
      setContent(type);
    }
  }

  /**
   * Date handler
   * @param {Object} datePressed - the date to update to
   */
  dateHandler(datePressed) {
    const {
      setDate,
      getAllEvents,
    } = this.props;
    if (typeof setDate === 'function') {
      setDate(datePressed);
    }
    if (typeof getAllEvents === 'function') {
      getAllEvents();
    }
  }

  /**
   * Render method
   * @returns {JSX}
     */
  render() {
    const {
      events,
      ready,
      contentType,
      channel,
      date,
    } = this.props;
    const currentFilter = filterTypes.find(obj => obj.type === contentType)
    || filterTypes[0];
    const currentDate = new Date(date);
    return (
      <div className="uvs-widget">
        <TvGuideNav
          channels={channelNav}
          activeChannel={channel}
          onPress={this.channelHandler}
        />
        <div className={Styles.subWrapper}>
          <div className={Styles.subInner}>
            <div className={Styles.filter}>
              {`${localization.get('filterBy')} :`}
            </div>
            <FilterTabMenu
              filterTypes={filterTypes}
              activeFilter={currentFilter.id}
              onChange={(event, filter) => this.contentTypeHandler(event, filter.type)}
            />
          </div>
          <div className={Styles.subInner} />
        </div>
        <TvGuideDateNav
          activeDate={currentDate.getDate()}
          onPress={this.dateHandler}
          className={Styles.dateNav}
        />
        <div className={Styles.header}>
          <div className={Styles.headerItem}>{localization.get('hour')}</div>
          <div className={classnames(Styles.headerItem, Styles.center)}>{localization.get('showMatch')}</div>
          <div className={Styles.headerItem}>{localization.get('seeIt')}</div>
        </div>
        <div>
          {!ready && <TVGuidePlaceholder />}
          {ready && isValidArray(events) ? events.map(
            event => (<TvGuideEvent key={`${event.type}-${event.time}`} event={event} />)
          ) : <div className={Styles.noInfo}>{localization.get('noInfo')}</div>
          }
        </div>
      </div>
    );
  }
}

TvGuide.propTypes = {
  date: PropTypes.instanceOf(Date),
  channel: PropTypes.string,
  contentType: PropTypes.string,
  setChannel: PropTypes.func,
  setContent: PropTypes.func,
  getAllEvents: PropTypes.func,
  setDate: PropTypes.func,
  ready: PropTypes.bool,
  events: PropTypes.array,
};

TvGuide.defaultProps = {
  contentType: SELECT_ALL,
};

export default TvGuide;
