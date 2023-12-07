import PropTypes from 'prop-types';
import React from 'react';

import Icon from '@univision/fe-icons/dist/components/Icon';
import localization from '../../../utils/localization';

import PlayStationButton from '../../connected/PlayStationButton/PlayStationButton';

import Styles from './StationLaunch.scss';

/**
 * StationLaunch Items.
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const StationLaunch = ({
  abacast,
  alternativeLogo,
  className,
  device,
  image,
  logo,
  sharingOptions,
  socialNetworks,
  stationDescription,
  stationTitle,
  theme,
  uri,
  uid,
}) => {
  return (
    <div className={`${Styles.container} ${className}`}>
      <div className={Styles.action}>
        <PlayStationButton
          abacast={abacast}
          alternativeLogo={alternativeLogo}
          device={device}
          image={image}
          logo={logo}
          sharingOptions={sharingOptions}
          socialNetworks={socialNetworks}
          stationDescription={stationDescription}
          stationTitle={stationTitle}
          type="nowPlayingPlain"
          uri={uri}
        >
          {localization.get('listen')}<br />{localization.get('live')}
        </PlayStationButton>
      </div>
      <div className={`${Styles.action} ${Styles.cta}`}>
        <PlayStationButton
          abacast={abacast}
          alternativeLogo={alternativeLogo}
          color={theme.primary}
          device={device}
          image={image}
          logo={logo}
          sharingOptions={sharingOptions}
          socialNetworks={socialNetworks}
          stationDescription={stationDescription}
          stationTitle={stationTitle}
          type="nowPlaying"
          uri={uri}
          uid={uid}
        />
      </div>
      <div className={Styles.action}>
        <Icon name="soundbars" size="xsmall" className={Styles.soundbar} />
      </div>
    </div>
  );
};

/**
 * propTypes
 * @property {Array} content Array of content items to be used by this widget
 */
StationLaunch.propTypes = {
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.object,
  className: PropTypes.string,
  device: PropTypes.string,
  image: PropTypes.object,
  logo: PropTypes.object,
  sharingOptions: PropTypes.object,
  socialNetworks: PropTypes.array,
  stationDescription: PropTypes.string,
  stationTitle: PropTypes.string,
  theme: PropTypes.object,
  uri: PropTypes.string,
  uid: PropTypes.string,
};

/**
 * Default Prop Values
 * @property {Array} content Default array of content items to be used by this widget
 */
StationLaunch.defaultProps = {
  theme: {},
  className: '',
};

export default StationLaunch;
