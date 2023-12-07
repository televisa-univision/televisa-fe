import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { isValidArray, getKey } from '@univision/fe-commons/dist/utils/helpers';
import Image from '@univision/fe-components-base/dist/components/Image';
import Link from '@univision/fe-components-base/dist/components/Link';
import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';
import NavWrapper from '@univision/shared-components/dist/components/v2/NavWrapper';
import Button from '@univision/shared-components/dist/components/v2/Button';
import CalReply from '@univision/fe-components-base/dist/components/CalReply';
import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '../../../utils/localization';
import { getTudnUrl } from '../../../utils/helpers';

import Styles from './LeagueGrid.scss';
/**
 * A lineup team displaying logo name and list of players
 * @param {Object} props The details of the players, lineup and  formation position
 * @returns {JSX}
 */
class LeagueGrid extends Component {
  /**
   * Setup the state
   */
  state = { visible: 0, active: 1 };

  /**
   * Get device so it knows when to applay margin to grid items
   * @param {string} device - the cuurent device from the store
   * @returns {number}
   */
  static getDeviceConstant(device) {
    switch (device) {
      case 'desktop':
        return 4;
      case 'tablet':
        return 3;
      default:
        return 2;
    }
  }

  /**
   * LeagueGrid component constructor
   * @param {Object} props React Props for this component
   */
  constructor(props) {
    super(props);
    this.timeout = null;
    this.device = getDevice(Store);
  }

  /**
   * Update soccer matches data after component was mount
   */
  componentDidMount() {
    this.setVisible();
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  /**
   * Toggle between active teams
   */
  setVisible() {
    this.setState({
      visible: 1,
    });
  }

  resize = () => window.gatsby_resize()

  /**
   * Change active conferation
   * @param {Object} item data of current selected confedation
   */
  changeSelected(item) {
    this.setState({
      active: item,
    });
    if (getKey(global, 'window.gatsby_resize')) {
      this.timeout = setTimeout(this.resize, 100);
    }
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      title,
      data,
      theme,
      className,
      isTournamentGrid,
      isTudn,
      type,
    } = this.props;

    const { visible } = this.state;
    const styling = { opacity: visible };
    const { active } = this.state;
    const gridMarginValue = LeagueGrid.getDeviceConstant(this.device);
    let info = [];

    if (isValidArray(data)) {
      const showTabs = isValidArray(data[0].items) && data.length > 2;
      if (!showTabs) {
        info = data;
      } else {
        data.map((d) => {
          if (getKey(d, 'id') === active) {
            const we = getKey(d, 'items');
            we.map((e, i) => {
              info[i] = e;
              return info;
            });
          }
          return info;
        });
      }

      return (
        <div
          style={styling}
          className={classnames('uvs-widget', Styles[type], className, {
            [Styles.tournament]: isTournamentGrid,
          })}
        >
          <TitleWrapper
            theme={theme}
            isTudn={isTudn}
            className={classnames(Styles.titleWrapper, {
              [Styles.titleNoPadding]: showTabs,
              [Styles.tudn]: isTudn,
            })}
          >
            <WidgetTitle isTudn={isTudn}>
              {localization.get(title)}
            </WidgetTitle>
            {showTabs && (
              <NavWrapper
                className={classnames(
                  Styles.nav,
                  {
                    [Styles.withScroll]: this.device === 'mobile',
                  }
                )}
                isTudn={isTudn}
              >
                {data.map((d) => {
                  return (
                    <Button
                      key={d.id}
                      type="nav"
                      isActive={active === d.id}
                      onPress={() => this.changeSelected(d.id)}
                      className={`navButton${d.id}`}
                      isTudn={isTudn}
                      useUpperCase
                    >
                      {d.name}
                    </Button>
                  );
                })}
              </NavWrapper>
            )}
          </TitleWrapper>
          <div className={classnames('row no-gutters', Styles.gridContainer, {
            [Styles.tudn]: isTudn,
          })}
          >
            {info.map((d, idx) => {
              const calReplyProps = {
                code: getKey(d, 'calreply.code'),
                href: getKey(d, 'calreply.href'),
                showTextButton: false,
                className: [Styles.onlyIcon],
                promoNameText: getKey(d, 'calreply.promo_name'),
              };
              const showCalReply = calReplyProps.code && calReplyProps.href;
              return (
                <div
                  key={d.id}
                  className={classnames(
                    Styles.gridItem,
                    {
                      [Styles.withMargin]: idx % gridMarginValue !== 0,
                      [Styles.withBorder]: isTudn,
                    }
                  )}
                >
                  <Link href={getTudnUrl(d.url)} className={`${Styles.gridName}`} target="_top">
                    <div className={Styles.itemLogo}>
                      <Image
                        src={d.logo}
                        alt={d.name}
                        className={Styles.logo}
                      />
                    </div>
                    <div className={`uvs-font-a-bold ${Styles.itemName}`}>
                      <span className={Styles.name}> {d.name} </span>
                    </div>
                  </Link>
                  {showCalReply
                    && type === 'bar' && <CalReply {...calReplyProps} />}
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return <div />;
  }
}

/**
 * propTypes
 * @property {string} title -  title identifying the type of grid in display
 * @property {array} data - data to build grid out of
 * @property {object} theme - theme object
 * @property {string} className - class for style overrides\
 * @property {bool} isTournamentGrid - Flag to define tournament behaviour
 * @property {bool} isTudn - Flag to apply TUDN theme
 * @property {string} type - Variable to define the type
*/
LeagueGrid.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  theme: PropTypes.object,
  className: PropTypes.string,
  isTournamentGrid: PropTypes.bool,
  isTudn: PropTypes.bool,
  type: PropTypes.string,
};

LeagueGrid.defaultProps = {
  className: '',
  isTournamentGrid: false,
  isTudn: false,
  type: 'square',
};

export default LeagueGrid;
