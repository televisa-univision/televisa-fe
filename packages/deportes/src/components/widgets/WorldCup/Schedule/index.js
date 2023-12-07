import React, { useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { US } from '@univision/fe-commons/dist/constants/userLocation';
import Icon from '@univision/fe-icons';
import Link from '@univision/fe-components-base/dist/components/Link';
import localization from '@univision/fe-utilities/localization/tudn';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import groupMatchesByDate from './utils/groupMatchesByDate';
import DateList from './DateList';
import ScoreCellList from './ScoreCellList';
import getActiveSection from './utils/getActiveSection';
import Styles from './Schedule.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

const ZonaFutbolWrapper = styled.div`
  ${Styles.zonaFutbolWrapper}
`;

const ZonaFutbolLink = styled(Link)`
  ${Styles.zonaFutbolLink}
`;

const ZonaFutbolLabel = styled.span`
  ${Styles.zonaFutbolLabel}
`;

const ZONA_FUTBOL_URL = 'https://vix.com/es-es/canales/selectos/channel-callsign-Frequency_ZONA_TUDN_US_PR';

/**
 * Schedule component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const Schedule = ({
  currentDateKey,
  matches,
  userLocation,
  widgetContext,
}) => {
  const [activeTab, setActiveTab] = useState(null);
  const { sections = {}, dates = [] } = useMemo(() => groupMatchesByDate(matches), [matches]);
  const activeMatchesList = useMemo(() => getActiveSection({
    activeTab, dates, sections, currentDateKey,
  }), [sections, dates, activeTab, currentDateKey]);

  const trackZonaFutbolClick = useCallback(() => {
    WidgetTracker.track(
      WidgetTracker.events.click,
      {
        widgetContext,
        target: 'prendetv_cta_external',
        extraData: {
          destination_url: ZONA_FUTBOL_URL,
        },
      }
    );
  }, [widgetContext]);

  const zonaFutbol = useMemo(() => {
    if (userLocation !== US) {
      return null;
    }

    return (
      <ZonaFutbolWrapper>
        <ZonaFutbolLink href={ZONA_FUTBOL_URL} target="_blank" onClick={() => trackZonaFutbolClick()}>
          <ZonaFutbolLabel>
            {localization.get('watchZonaFutbol')}
          </ZonaFutbolLabel>
          <Icon name="vix" width={30} height={12} viewBox="0 0 80 40" />
        </ZonaFutbolLink>
      </ZonaFutbolWrapper>
    );
  }, [userLocation, trackZonaFutbolClick]);

  return (
    <Wrapper>
      {dates && (
        <DateList
          dates={dates}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          widgetContext={widgetContext}
          currentDateKey={currentDateKey}
        />
      )}
      {zonaFutbol}
      {activeMatchesList && (
        <ScoreCellList
          matches={activeMatchesList}
          userLocation={userLocation}
          widgetContext={widgetContext}
        />
      )}
    </Wrapper>
  );
};

Schedule.propTypes = {
  currentDateKey: PropTypes.string,
  matches: PropTypes.array,
  userLocation: PropTypes.string,
  widgetContext: PropTypes.object,
};

Schedule.defaultProps = {
  userLocation: US,
  widgetContext: {},
};

export default Schedule;
