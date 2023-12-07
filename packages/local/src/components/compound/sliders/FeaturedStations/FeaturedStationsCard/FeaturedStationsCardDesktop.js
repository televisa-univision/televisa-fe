import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';

import Link from '@univision/fe-components-base/dist/components/Link';
import Picture from '@univision/fe-components-base/dist/components/Picture';
import Icon from '@univision/fe-icons/dist/components/Icon';

import BackgroundImage from '@univision/fe-components-base/dist/components/BackgroundImage';
import * as ratios from '@univision/fe-components-base/dist/components/Picture/aspectRatios';
import PlayStationButton from '../../../../connected/PlayStationButton/PlayStationButton';
import { getRadioStationProps } from '../../../../../utils/helpers';
import Styles from './FeaturedStationsCardDesktop.scss';

/**
 * Featured Stations Card Desktop Component
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
class FeaturedStationsCardDesktop extends Component {
  /**
   * Initialize the state
   */
  constructor() {
    super();
    this.state = {
      isHover: false,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  /**
   * Update the isHover state when the mouse enter the card
   */
  handleMouseOver() {
    this.setState({ isHover: true });
  }

  /**
   * Update the isHover state when the mouse leaves the card
   */
  handleMouseOut() {
    this.setState({ isHover: false });
  }

  /**
   * Render function
   * @returns {JSX}
   */
  render() {
    const { isHover } = this.state;
    const {
      images, card, abacast, device,
    } = this.props;
    return (
      <div
        className={`${Styles.card} ${isHover ? Styles.active : ''}`}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
      >
        <div className={Styles.wrapper}>
          <BackgroundImage
            image={images}
            className={Styles.image}
            device={device}
            aspectRatio={ratios.ASPECT_RATIO_ORIGINAL}
          />
          <div className={Styles.infoWrap}>
            <Link
              className={Styles.info}
              href={card.uri}
            >
              {hasKey(card, 'radioStation.alternativeLogo') && (
                <Picture image={card.radioStation.alternativeLogo} />
              )}
            </Link>
          </div>
          <div className={Styles.radioButtonWrapper}>
            <PlayStationButton
              abacast={abacast}
              type="featuredStation"
              {...getRadioStationProps(card)}
            >
              <Icon name="playnocircleLegacy" size="small" />
            </PlayStationButton>
          </div>
          <div className={Styles.gradientContainer} />
        </div>
      </div>
    );
  }
}

FeaturedStationsCardDesktop.propTypes = {
  images: PropTypes.object,
  abacast: PropTypes.object,
  device: PropTypes.string,
  card: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
    radioStation: PropTypes.shape({
      alternativeLogo: PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        caption: PropTypes.string,
        credit: PropTypes.string,
        renditions: PropTypes.object,
      }),
    }),
  }),
};

export default FeaturedStationsCardDesktop;
