import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';

import localization from '../../../../utils/localization';
import StationLaunch from '../../../compound/StationLaunch/StationLaunch';
import Styles from './PerformanceInfo.styles';

const Container = styled.div`${Styles.container}`;
const Info = styled.div`${Styles.performanceInfo}`;
const OnAir = styled.span`${Styles.onAir}`;
const Title = styled.h3`${Styles.title}`;
const Artist = styled.h4`${Styles.artist}`;
const LauncherWrap = styled.div`${Styles.launcherWrap}`;
const WaveIcon = styled(Icon)`${Styles.wave}`;
const StationLaunchStyled = styled(StationLaunch)`${Styles.launch}`;

/**
 * PerformanceInfo
 * @param {string} title component props;
 * @param {Object} artist component props;
 * @param {bool} playing component props;
 * @param {string} abacastId component props;
 * @param {string} modifierClass component props;
 * @param {stationTitle} stationTitle component props;
 * @returns {JSX}
 */
const PerformanceInfo = ({
  abacast,
  alternativeLogo,
  artist,
  device,
  image,
  logo,
  modifierClass,
  sharingOptions,
  socialNetworks,
  stationDescription,
  stationTitle,
  theme,
  title,
  uri,
  uid,
}) => {
  return (
    <Container className={modifierClass}>
      <Info>
        <OnAir>
          <WaveIcon name="waves-left" size="xxsmall" />
          {localization.get('onAir')}
          <WaveIcon name="waves-right" size="xxsmall" />
        </OnAir>
        <Title>{title}</Title>
        {artist && <Artist>{artist}</Artist>}
      </Info>
      <LauncherWrap>
        <StationLaunchStyled
          abacast={abacast}
          alternativeLogo={alternativeLogo}
          device={device}
          image={image}
          logo={logo}
          sharingOptions={sharingOptions}
          socialNetworks={socialNetworks}
          stationDescription={stationDescription}
          stationTitle={stationTitle}
          theme={theme}
          uri={uri}
          uid={uid}
        />
      </LauncherWrap>
    </Container>
  );
};

PerformanceInfo.propTypes = {
  abacast: PropTypes.object,
  alternativeLogo: PropTypes.object,
  artist: PropTypes.string,
  device: PropTypes.string,
  image: PropTypes.object,
  logo: PropTypes.object,
  modifierClass: PropTypes.string,
  sharingOptions: PropTypes.object,
  socialNetworks: PropTypes.array,
  stationDescription: PropTypes.string,
  stationTitle: PropTypes.string,
  theme: PropTypes.object,
  title: PropTypes.string,
  uri: PropTypes.string,
  uid: PropTypes.string,
};

PerformanceInfo.defaultProps = {
  modifierClass: '',
  theme: {},
};

export default PerformanceInfo;
