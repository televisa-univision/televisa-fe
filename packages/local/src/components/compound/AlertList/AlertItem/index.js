import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Collapsible from '@univision/fe-components-base/dist/components/Collapsible';
import Icon from '@univision/fe-icons/dist/components/Icon';
import { DARK_BLUE } from '@univision/fe-commons/dist/utils/styled/constants';
import { localTimeFormat } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import TrackWeather from '@univision/fe-commons/dist/utils/tracking/tealium/weather/WeatherTracker';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import getSpanishTranslation from '@univision/fe-graphql-services/dist/requests/queries/getSpanishTranslation';
import { TRANSLATION_ERROR } from '@univision/fe-commons/dist/constants/messages';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import marketCoordinates from '@univision/fe-commons/dist/constants/marketCoordinates.json';
import AlertItemStyle from './AlertItem.scss';
import Styles from './AlertItem.styles';
import localization from '../../../../utils/localization';
import { getTextChunks } from '../../../../utils/helpers';

const Arrow = styled(Icon).attrs({ fill: DARK_BLUE, size: 'small' })`${Styles.arrow}`;
const Description = styled.div.attrs({ className: 'uvs-font-a-regular' })`${Styles.description}`;
const Info = styled.span.attrs({ className: 'uvs-font-c-regular' })`${Styles.info}`;
const Dot = styled(Icon).attrs({ name: 'dot', size: 'medium' })`${Styles.dot}`;
const DottedLine = styled.div`${Styles.dottedLine}`;
const IssueTime = styled.p`${Styles.issueTime}`;
const Header = styled.div`${Styles.header}`;
const Loading = styled.span.attrs({ className: 'uvs-font-a-regular' })``;
const Title = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.title}`;
const TitleContainer = styled.div`${Styles.titleContainer}`;

const chunkPoint = '\n';
const arrows = {
  show: 'arrowUp',
  hide: 'arrowDown',
};

/**
 * Format date for the specific use case of this component
 * @param {string} date date object to be formatted
 * @param {string} timeZone timeZone to be formatted
 * @param {string} timeZoneAbbreviation timeZoneAbbreviation to be append
 * @returns {string|undefined} 12:51 AM JUN 30, 2020
 */
const formatDate = (date, timeZone, timeZoneAbbreviation) => {
  let issueTime = date && localTimeFormat({ date, useOneDigitForHours: true, timeZone });
  issueTime = issueTime
    && ` ${issueTime?.time} ${timeZoneAbbreviation} ${issueTime?.month?.abbreviatedMonth} ${issueTime?.day}, ${issueTime?.year}`;
  return issueTime;
};

/**
 * Renders the AlertItem widget
 * @param {string} county - name of the county
 * @param {string} date - issue date to be display at the header
 * @param {string} details - collapsible content
 * @param {string} localMarketName - current market name
 * @param {string} severity - risk of alert
 * @param {string} serverUri - translation url
 * @param {string} title - accordion title
 * @returns {JSX}
 */
const AlertItem = ({
  localMarketName,
  county,
  date,
  description,
  severity,
  serverUri,
  title,
}) => {
  const trackEvent = useCallback((status) => {
    if (status === 'show') {
      const trackData = {
        type: title,
        market: localMarketName,
        county,
      };
      TrackWeather.track(
        TrackWeather.events.alertClick,
        trackData
      );
    }
  }, [county, localMarketName, title]);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);
  const issueTime = useMemo(() => {
    const localMarket = getKey(marketCoordinates, localMarketName, {});
    const timeZone = localMarket?.timeZone;
    const timeZoneAbbreviation = localMarket?.timeZoneAbbreviation;
    return formatDate(date, timeZone, timeZoneAbbreviation);
  }, [localMarketName, date]);

  const issued = localization.get('weatherAlertsIssueTime');
  const descriptionChunks = useMemo(() => getTextChunks(description, 4900), [description]);

  /**
   * Handle the visibility change of Collapsible details
   * @param {string} status visibility status of collapsible
   * @returns {undefined}
   */
  const onChange = async (status) => {
    trackEvent(status);
    if (status === 'show' && !translation) {
      setLoading(true);
      try {
        const promises = descriptionChunks.map((chunk) => {
          return fetchGraphQL({
            query: getSpanishTranslation,
            variables: { text: chunk },
            serverUri,
          });
        });
        const response = await Promise.all(promises);
        let spanishTranslation = response.map(item => item.getSpanishTranslation);
        spanishTranslation = spanishTranslation.join(chunkPoint);
        setTranslation(spanishTranslation);
      } catch (err) {
        err.message = `${TRANSLATION_ERROR} fetchReactions rejected: ${err.message}`;
        clientLogging(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Collapsible
      onChange={onChange}
      className={!description ? AlertItemStyle.notCollapsible : null}
      header={({ status }) => (
        <Header>
          <TitleContainer>
            <Dot severity={severity} />
            <Title severity={severity}>{title}</Title>
          </TitleContainer>
          { description && <Arrow name={arrows[status]} /> }
        </Header>
      )}
    >
      {description && (
        <Description>
          {loading && <Loading>{`${localization.get('loading')}...`}</Loading>}
          {translation && (
            <>
              {issueTime && (
                <IssueTime>
                  <strong>{issued}:</strong>{issueTime} - <Info>Traducido por AWS</Info>
                </IssueTime>
              )}
              <p>{translation}</p>
              <DottedLine />
              {issueTime
              && (
                <IssueTime>
                  <strong>Issued:</strong>{issueTime} - <Info>English Original Source</Info>
                </IssueTime>
              )
              }
              <p>{description}</p>
            </>
          )}
        </Description>
      )}
    </Collapsible>
  );
};

AlertItem.propTypes = {
  county: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string.isRequired,
  localMarketName: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  serverUri: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AlertItem;
