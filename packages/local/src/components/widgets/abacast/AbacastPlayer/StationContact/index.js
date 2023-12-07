import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '@univision/fe-icons/dist/components/Icon';
import Link from '@univision/fe-components-base/dist/components/Link';
import StationPopup from '../StationPopup';
import Styles from './StationContact.scss';

/**
 * Station contact component
 */
class StationContact extends Component {
  /**
   * Constructor
   */
  constructor() {
    super();

    this.getSocialNetworkLink = this.getSocialNetworkLink.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Get the social network link by name
   * @param {string} name the social network name
   * @returns {string}
   */
  getSocialNetworkLink(name) {
    const { socialNetworks } = this.props;

    const socialNetwork = socialNetworks.find(network => network.name === name);

    if (socialNetwork) {
      return socialNetwork.url;
    }

    const defaults = {
      Facebook: 'https://www.facebook.com/univision',
      Instagram: 'https://www.instagram.com/univision',
      Twitter: 'https://twitter.com/univision',
    };

    return defaults[name];
  }

  /**
   * Handle close
   */
  handleClose() {
    const { onClose } = this.props;
    onClose('stationContact');
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    return (
      <StationPopup onClose={this.handleClose} title="Contact">
        <div className={Styles.contactItems}>
          <Link href={this.getSocialNetworkLink('Facebook')} target="_blank">
            <Icon name="facebookLegacy" size="xsmall" />
            Facebook
          </Link>
          <Link href={this.getSocialNetworkLink('Instagram')} target="_blank">
            <Icon name="instagramLegacy" size="xsmall" />
            Instagram
          </Link>
          <Link href={this.getSocialNetworkLink('Twitter')} target="_blank">
            <Icon name="twitterLegacy" size="xsmall" />
            Twitter
          </Link>
        </div>
      </StationPopup>
    );
  }
}

StationContact.propTypes = {
  onClose: PropTypes.func.isRequired,
  socialNetworks: PropTypes.array,
};

StationContact.defaultProps = {
  socialNetworks: [],
};

export default StationContact;
