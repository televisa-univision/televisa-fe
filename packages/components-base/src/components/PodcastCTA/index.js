import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import uforiaSettings from '@univision/fe-commons/dist/config/appstore';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { RADIO } from '@univision/fe-commons/dist/constants/pageCategories';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import { MOBILE } from '@univision/fe-commons/dist/constants/devices';

import Link from '../Link';
import Styles from './PodcastCTA.styles';

const UforiaIcon = styled(Icon).attrs({
  name: 'uforiaApp',
  size: 32,
})`${Styles.uforiaIcon}`;
const Wrapper = styled(Link).attrs({
  className: 'uvs-font-c-regular',
})`${Styles.wrapper}`;

/**
 * PodcastCTA component
 * @returns {JSX}
 */
const PodcastCTA = () => {
  const device = useSelector(deviceSelector);
  const isMobile = device === MOBILE;
  const { storeLink, desktopLink } = uforiaSettings[RADIO];
  const ctaUrl = isMobile ? storeLink : desktopLink;

  const downloadAppTracking = useCallback(() => {
    const eventAction = 'topnav-download-app';
    const utagData = {
      eventAction,
    };

    NavigationTracker.track(NavigationTracker.events.click, utagData);
  }, []);

  return (
    <Wrapper target="_blank" href={ctaUrl} onClick={downloadAppTracking}>
      {localization.get('downloadApp')}
      <UforiaIcon />
    </Wrapper>
  );
};

export default PodcastCTA;
