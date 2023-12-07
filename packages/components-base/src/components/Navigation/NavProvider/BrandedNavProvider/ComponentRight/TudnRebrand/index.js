import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import localization from '@univision/fe-utilities/localization';
import { DESERT_STORM, SPRING_GREEN } from '@univision/fe-utilities/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { TUDN_SITE } from '@univision/fe-commons/dist/constants/sites';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import { pageUriSelector, userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import toRelativeUrl from '@univision/fe-utilities/helpers/url/toRelativeUrl';
import { MX } from '@univision/fe-commons/dist/constants/userLocation';

import Styles from './TudnRebrand.styles';
import Link from '../../../../../Link';

const MATCHES = [
  '/futbol/partidos-de-futbol-para-hoy-en-vivo',
  '/mx/futbol/partidos-de-futbol-para-hoy-en-vivo',
];

const Wrapper = styled.div`${Styles.wrapper}`;
const VixLogoWrapper = styled.div`${Styles.vixLogoWrapper}`;
const MatchesWrapper = styled.div`${Styles.matchesWrapper}`;
const PartidosText = styled.span`${Styles.partidosText}`;

/**
 * Creates TudnRebrand right component
 * @param {string} userLocation current user location
 * @returns {JSX}
 */
const TudnRebrand = () => {
  const userLocation = useSelector(userLocationSelector);

  const link = 'https://vix.com/es/canales?utm_source=univision&utm_medium=internal_referral&utm_campaign=evergreen&utm_content=0&utm_term=top_nav&utm_keyword=0&ko_click_id=ko_mirbv8s4he6a7wwip';
  const vixCallback = useCallback(() => {
    Tracker.fireEvent({
      event: 'topnav-header-prendetv',
      destination_url: link,
    });
  }, [link]);

  const matchesCallback = useCallback(() => {
    Tracker.fireEvent({
      event: 'topnav-header-partidos',
      destination_url: `${userLocation === MX ? '/mx' : ''}/futbol/partidos-de-futbol-para-hoy-en-vivo`,
    });
  }, [userLocation]);

  const currentPageUri = useSelector(pageUriSelector);
  const relativeUrl = toRelativeUrl(currentPageUri);
  const isMatchesActive = relativeUrl && MATCHES.includes(relativeUrl);

  return (
    <Wrapper>
      <Link href="/futbol/partidos-de-futbol-para-hoy-en-vivo" site={TUDN_SITE} checkUserLocation onClick={matchesCallback}>
        <MatchesWrapper>
          <Icon
            name="calendar"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            stroke={isMatchesActive ? SPRING_GREEN : DESERT_STORM}
          />
          <PartidosText isMatchesActive={isMatchesActive}>{localization.get('matches')}</PartidosText>
        </MatchesWrapper>
      </Link>
      <Link
        href={link}
        target="_blank"
        onClick={vixCallback}
      >
        <VixLogoWrapper>
          <Icon name="vix" viewBox="0 0 90 80" width={40} height={40} />
        </VixLogoWrapper>
      </Link>
    </Wrapper>
  );
};

export default TudnRebrand;
