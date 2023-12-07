import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import Button from '@univision/fe-components-base/dist/components/Button';
import localization from '@univision/fe-utilities/localization/tudn';
import logoMx from '@univision/fe-commons/dist/assets/images/tudn/logos/logo_mx_qatar2022.svg';
import logoUs from '@univision/fe-commons/dist/assets/images/tudn/logos/logo_qatar2022.svg';
import { userLocationSelector, proxySelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import FullWidth from '@univision/fe-components-base/dist/components/FullWidth';
import { US } from '@univision/fe-commons/dist/constants/userLocation';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import {
  PARTIDOS_TAB,
  POSICIONES_TAB,
  EQUIPOS_TAB,
} from './constants';
import Styles from './WorldCup.styles';
import Schedule from './Schedule';
import getSchedule from './utils/getSchedule';
import getStandings from './utils/getStandings';
import Standings from './Standings';
import Teams from './Teams';

const TABS = [
  { key: PARTIDOS_TAB, label: localization.get('matches') },
  { key: POSICIONES_TAB, label: localization.get('standings') },
  { key: EQUIPOS_TAB, label: localization.get('teams') },
];

const TabContainer = styled.div`
  ${Styles.tabContainer}
`;
const Tab = styled(Button)`
  ${Styles.tab}
`;
const LogoWrapper = styled.div`
  ${Styles.logoWrapper}
`;
const LogoImg = styled.img`
  ${Styles.logoImg}
`;
const TopWrapper = styled(FullWidth)`
  ${Styles.topWrapper}
`;
const BottomWrapper = styled(FullWidth)`
  ${Styles.bottomWrapper}
`;

/**
 * WorldCup widget
 * @returns {JSX}
 */
const WorldCup = ({ widgetContext }) => {
  const [activeTab, setActiveTab] = useState(PARTIDOS_TAB);
  const [schedule, setSchedule] = useState(null);
  const [standings, setStandings] = useState(null);

  const userLocation = useSelector(userLocationSelector);
  const proxyUri = useSelector(proxySelector);

  useEffect(() => {
    /**
     * Schedule async request
     */
    const requestSchedule = async () => {
      if (activeTab === PARTIDOS_TAB && !schedule) {
        const response = await getSchedule(userLocation, proxyUri);
        setSchedule(response);
      }
    };
    requestSchedule();
  }, [activeTab, schedule, userLocation, proxyUri]);

  useEffect(() => {
    /**
     * Standings async request
     */
    const requestStandings = async () => {
      if (activeTab === POSICIONES_TAB && !standings) {
        const response = await getStandings(proxyUri);
        setStandings(response);
      }
    };

    /**
     * Teams async request
     */
    const requestTeams = async () => {
      if (activeTab === EQUIPOS_TAB && !standings) {
        const response = await getStandings(proxyUri);
        setStandings(response);
      }
    };

    requestStandings();
    requestTeams();
  }, [activeTab, standings, proxyUri]);

  const handleActiveTab = useCallback((key) => {
    WidgetTracker.track(
      WidgetTracker.events.click,
      {
        widgetContext,
        target: `subnav-wcwidget-${key}`,
      }
    );
    setActiveTab(key);
  }, [widgetContext]);

  const tabs = useMemo(() => {
    return (
      <TabContainer>
        {TABS.map(item => (
          <Tab
            key={item.key}
            onClick={() => handleActiveTab(item.key)}
            isActive={item.key === activeTab}
          >
            {item.label}
          </Tab>
        ))}
      </TabContainer>
    );
  }, [activeTab, handleActiveTab]);

  const logo = useMemo(() => {
    return (
      <LogoWrapper>
        <LogoImg
          src={userLocation === US ? logoUs : logoMx}
          userLocation={userLocation}
          alt="Qatar 2022"
        />
      </LogoWrapper>
    );
  }, [userLocation]);

  const currentDateKey = useMemo(() => {
    const currentDate = new Date();

    return `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
  }, []);

  return (
    <div className="uvs-widget">
      <TopWrapper>
        <div className="uvs-container">
          {logo}
          {tabs}
        </div>
      </TopWrapper>
      <BottomWrapper activeTab={activeTab}>
        <div className="uvs-container">
          {(schedule && activeTab === PARTIDOS_TAB) && (
            <Schedule
              matches={schedule}
              userLocation={userLocation}
              widgetContext={widgetContext}
              currentDateKey={currentDateKey}
            />
          )}
          {(standings && activeTab === POSICIONES_TAB) && (
            <Standings
              {...standings}
              viewMoreLink="/futbol/mundial-qatar-2022/posiciones"
              widgetContext={widgetContext}
            />
          )}
          {(standings && activeTab === EQUIPOS_TAB) && (
            <Teams {...standings} />
          )}
        </div>
      </BottomWrapper>
    </div>
  );
};

WorldCup.propTypes = {
  widgetContext: PropTypes.object,
};

export default WorldCup;
