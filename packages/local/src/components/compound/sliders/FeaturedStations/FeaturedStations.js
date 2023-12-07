import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import {
  getKey, hasKey, isValidObject, isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';
import radioTheme from '@univision/fe-commons/dist/themes/radio';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import Loading from '@univision/fe-components-base/dist/components/Loading';

import CoreSlider from '@univision/fe-components-base/dist/components/CoreSlider';
import SlideArrow from '@univision/fe-components-base/dist/components/SlideArrow';

import localization from '../../../../utils/localization';

import FeatureStationsCardDesktop from './FeaturedStationsCard/FeaturedStationsCardDesktop';
import FeatureStationsCardMobile from './FeaturedStationsCard/FeaturedStationsCardMobile';

import Styles from './FeaturedStations.scss';

const RADIO_THEME = radioTheme();

/**
 * Featured Stations widget
 */
class FeaturedStations extends Component {
  /**
   * Initialize the state
   */
  constructor() {
    super();

    this.state = {
      activeStationIndex: 0,
    };
  }

  /**
   * Update the active station index in state
   * @param {number} idx the new index
   */
  updateActiveStationIndex = (idx) => {
    this.setState({ activeStationIndex: idx });
  };

  /**
   * Render a featured station card
   * @param {Object} card the data for the card
   * @param {number} index the index of the card
   * @returns {JSX}
   */
  renderCard = (card, index) => {
    const data = { ...card };
    if (!isValidObject(data)) {
      return null;
    }
    if (!hasKey(data, 'radioStation')) {
      data.radioStation = card;
    }
    const { device } = this.props;
    const { activeStationIndex } = this.state;
    const { radioStation, uid } = data;
    const images = getKey(radioStation, 'featuredStationsPromoImage')
      || getKey(radioStation, 'image', '');
    return (
      <div key={uid}>
        {device === 'desktop' ? (
          <FeatureStationsCardDesktop
            theme={RADIO_THEME}
            images={images}
            card={data}
            abacast={getKey(data, 'radioStation.abacast')}
            device={device}
          />
        ) : (
          <FeatureStationsCardMobile
            theme={RADIO_THEME}
            images={images}
            card={data}
            index={index}
            activeStationIndex={activeStationIndex}
            abacast={getKey(data, 'radioStation.abacast')}
            device={device}
          />
        )}
      </div>
    );
  };

  /**
   * render function
   * @returns {JSX}
   */
  render() {
    const { activeStationIndex } = this.state;
    const { content } = this.props;
    const length = Array.isArray(content) && content.length;

    const settings = {
      dots: false,
      centerMode: true,
      infinite: true,
      centerPadding: '6px',
      slidesToShow: Math.min(10, length),
      speed: 500,
      lazyLoad: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerPadding: '100px',
            slidesToShow: 1,
            lazyLoad: false,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            centerPadding: '40px',
            slidesToShow: Math.min(5, length),
            lazyLoad: false,
          },
        },
      ],
      className: Styles.carousel,
      prevArrow: <SlideArrow direction="prev" offset={{ left: '-4rem', top: '2rem', bottom: '1.75rem' }} theme="none" />,
      nextArrow: <SlideArrow direction="next" offset={{ right: '-4rem', top: '2rem', bottom: '1.75rem' }} theme="none" />,
      afterChange: Store.getState().page.device !== 'desktop' && this.updateActiveStationIndex,
    };
    const bgImageUrl = isValidArray(content) && getKey(content[activeStationIndex], 'radioStation.featuredStationsPromoImage.renditions.16x9-sm.href');
    const style = bgImageUrl && { backgroundImage: `url('${bgImageUrl}')` };
    const placeholder = (
      <div className={Styles.placeholderContainer}>
        {<Loading label={`${localization.get('loading')}...`} theme={getTheme(Store)} />}
      </div>
    );

    return (
      <FullWidth className={Styles.fullWidthModifier}>
        <div className={Styles.background} style={style} />
        <div className={Styles.container}>
          <span className={`${Styles.callToAction} uvs-font-a-bold`}>{localization.get('listenLiveRadio')}</span>
          {Array.isArray(content) && (
            <CoreSlider settings={settings} placeholder={placeholder}>
              {content.slice(0, 7).map(this.renderCard)}
            </CoreSlider>
          )}
        </div>
      </FullWidth>
    );
  }
}

FeaturedStations.propTypes = {
  device: PropTypes.string.isRequired,
  content: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    promoImages: PropTypes.shape({
      desktopImage: PropTypes.shape({
        href: PropTypes.string,
      }),
      mobileImage: PropTypes.shape({
        href: PropTypes.string,
      }),
    }),
    radioStation: PropTypes.shape({
      logo: PropTypes.shape({
        renditions: PropTypes.shape({
          original: PropTypes.shape({
            href: PropTypes.string,
          }),
        }),
      }),
      alternativeLogo: PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        caption: PropTypes.string,
        credit: PropTypes.string,
        renditions: PropTypes.object,
      }),
      featuredStationsPromoImage: PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        caption: PropTypes.string,
        credit: PropTypes.string,
        renditions: PropTypes.object,
      }),
    }),
  })),
};

export default FeaturedStations;
