import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Styles from './AlertList.styles';
import AlertItem from './AlertItem';

export const Container = styled.div`${Styles.container}`;
export const Title = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.container}`;

/**
 * Renders the AlertList widget
 * @param {array} alerts alerts to be displayed
 * @param {string} county name of the county
 * @param {string} localMarketName name of the local market
 * @param {string} serverUri graphql endpoint url
 * @returns {JSX}
 */
const AlertList = ({
  alerts,
  county,
  localMarketName,
  serverUri,
}) => {
  return (
    <Container>
      <Title>{county}</Title>
      {
        alerts.map((alert) => {
          const { texts } = alert;
          const description = texts[0]?.description;
          return (
            <AlertItem
              county={county}
              date={alert.issueTimeLocal}
              description={description}
              key={alert.areaId}
              localMarketName={localMarketName}
              severity={alert.severity}
              serverUri={serverUri}
              title={alert.eventDescription}
            />
          );
        })
      }
    </Container>
  );
};

AlertList.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      areaId: PropTypes.string.isRequired,
      issueTimeLocal: PropTypes.string,
      severity: PropTypes.string.isRequired,
      texts: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  county: PropTypes.string.isRequired,
  localMarketName: PropTypes.string,
  serverUri: PropTypes.string.isRequired,
};

export default AlertList;
