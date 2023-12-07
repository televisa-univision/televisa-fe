/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import classnames from 'classnames';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Link from '@univision/fe-components-base/dist/components/Link';
import Icon from '@univision/fe-icons/dist/components/Icon';
import UforiaIcon from '../UforiaIcon';
import Styles from './StationMenu.scss';

/**
 * Station Menu
 */
export class StationMenuComponent extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleContactClick = this.handleContactClick.bind(this);
  }

  /**
   * Handle outside clicks
   * @param {Object} evt the click event
   */
  handleClickOutside(evt) {
    evt.stopPropagation();
    const { onClose, visible } = this.props;

    if (visible) {
      onClose('stationMenu');
    }
  }

  /**
   * Handle clicking on the contact button
   */
  handleContactClick() {
    const { onClose, onOpen } = this.props;
    onOpen('stationContact');
    onClose('stationMenu');
  }

  /**
   * Render function
   * @returns {JSX}
   */
  render() {
    const { uri, visible } = this.props;

    return (
      <div className={classnames(Styles.menu, { [Styles.visible]: visible })}>
        <Link className={Styles.menuItem} href={uri} target="_blank" useExplicitNavigation>
          <Icon name="radioLegacy" size="xsmall" viewbox="0 0 18 18" /> {localization.get('viewStation')}
        </Link>
        <button className={Styles.menuItem} onClick={this.handleContactClick}>
          <Icon name="contact" size="xsmall" viewbox="0 0 18 18" /> {localization.get('contact')}
        </button>
      </div>
    );
  }
}

StationMenuComponent.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  uri: PropTypes.string,
  visible: PropTypes.bool,
};

const EnhancedStationMenu = onClickOutside(StationMenuComponent);

/**
 * Toggle component to show the station menu
 * @returns {JSX}
 */
class StationMenuToggle extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handle click event
   */
  handleClick() {
    const { onClose, onOpen, visible } = this.props;

    if (visible) {
      onClose('stationMenu');
    } else {
      onOpen('stationMenu');
    }
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const { onClose, visible, ...rest } = this.props;

    return (
      <div className={classnames(Styles.toggle, 'ignore-react-onclickoutside')}>
        <UforiaIcon name="more" onClick={this.handleClick} />
        <EnhancedStationMenu onClose={onClose} visible={visible} {...rest} />
      </div>
    );
  }
}

StationMenuToggle.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

export default StationMenuToggle;
