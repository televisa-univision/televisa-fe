import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PerformanceInfo from '../PerformanceInfo/PerformanceInfo';

import Styles from './RadioPerformance.styles';

const Wrapper = styled.div`${Styles.performanceWrapper}`;
const BackgroundArt = styled.div`${Styles.backgroundArt}`;
const Performance = styled.div`${Styles.performance}`;
const AlbumArt = styled.div`${Styles.albumArt}`;
const Metadata = styled.div`${Styles.metadata}`;

/**
 * RadioPerformance widget
 */
export default class RadioPerformance extends React.PureComponent {
  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const {
      alternativeLogo,
      image,
      logo,
      playing,
      sharingOptions,
      socialNetworks,
      stationDescription,
      stationTitle,
      theme,
      device,
      abacast,
      uri,
      uid,
    } = this.props;

    return (
      <Wrapper>
        <BackgroundArt />
        <Performance>
          <AlbumArt />
          <Metadata>
            <PerformanceInfo
              abacast={abacast}
              alternativeLogo={alternativeLogo}
              playing={playing}
              image={image}
              logo={logo}
              sharingOptions={sharingOptions}
              socialNetworks={socialNetworks}
              stationDescription={stationDescription}
              stationTitle={stationTitle}
              theme={theme}
              device={device}
              uri={uri}
              uid={uid}
            />
          </Metadata>
        </Performance>
      </Wrapper>
    );
  }
}

RadioPerformance.propTypes = {
  performance: PropTypes.shape({
    id: PropTypes.number,
    largeimage: PropTypes.string,
    title: PropTypes.string,
    artist: PropTypes.string,
  }),
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.number,
  image: PropTypes.object,
  logo: PropTypes.object,
  playing: PropTypes.bool,
  sharingOptions: PropTypes.object,
  socialNetworks: PropTypes.array,
  stationDescription: PropTypes.string,
  stationTitle: PropTypes.string,
  theme: PropTypes.object,
  device: PropTypes.string,
  uri: PropTypes.string,
  uid: PropTypes.string,
};
