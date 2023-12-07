import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@univision/fe-commons/dist/store/actions/player-actions';
import RadioPerformance from '../../widgets/abacast/RadioPerformance/RadioPerformance';

/**
 * NowPlaying card widget
 */
export class NowPlayingComponent extends Component {
  /**
   * initRadio
   */
  componentDidMount() {
    const { initRadio } = this.props;
    initRadio();
  }

  /**
   * Now playing card displays performance information for
   * the current radio station.
   * @returns {JSX}
   */
  render() {
    const {
      abacast,
      alternativeLogo,
      defaultChartImage,
      device,
      image,
      logo,
      playing,
      sharingOptions,
      socialNetworks,
      stationDescription,
      stationTitle,
      theme,
      uri,
      uid,
    } = this.props;

    return (
      <div className="uvn-nowplaying">
        <RadioPerformance
          abacast={abacast}
          alternativeLogo={alternativeLogo}
          defaultChartImage={defaultChartImage}
          device={device}
          image={image}
          logo={logo}
          playing={playing}
          sharingOptions={sharingOptions}
          socialNetworks={socialNetworks}
          stationDescription={stationDescription}
          stationTitle={stationTitle}
          theme={theme}
          uri={uri}
          uid={uid}
        />
      </div>
    );
  }
}

/**
 * propTypes
 * @property {boolean} playing whether or not the stream is playing (from store)
 * @property {function} initRadio redux action
 */
NowPlayingComponent.propTypes = {
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.object,
  image: PropTypes.object,
  logo: PropTypes.object,
  sharingOptions: PropTypes.object,
  socialNetworks: PropTypes.array,
  stationDescription: PropTypes.string,
  stationTitle: PropTypes.string,
  device: PropTypes.string,
  theme: PropTypes.object,
  defaultChartImage: PropTypes.string,
  // redux props/actions
  playing: PropTypes.bool.isRequired,
  initRadio: PropTypes.func.isRequired,
  uri: PropTypes.string,
  uid: PropTypes.string,
};

export default connect(
  null,
  {
    initRadio: actions.initRadio,
  }
)(NowPlayingComponent);
