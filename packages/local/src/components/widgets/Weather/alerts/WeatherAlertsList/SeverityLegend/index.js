import React, { useMemo } from 'react';
import styled from 'styled-components';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Icon from '@univision/fe-icons';
import { WEATHER_ALERT_SEVERITIES } from '@univision/fe-commons/dist/constants/weather';
import Styles from './SeverityLegend.styles';
import alertColors from '../../../../../compound/AlertList/AlertItem/alertColors';

const Dot = styled(Icon).attrs({ name: 'dot', width: 40, height: 40 })`${Styles.dot}`;
const Label = styled.span.attrs({ className: 'uvs-font-c-bold' })`${Styles.label}`;
const LabelWrapper = styled.div`${Styles.labelWrapper}`;
const Title = styled.span.attrs({ className: 'uvs-font-c-bold' })`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Renders the Severity Legend component
 * @returns {JSX}
 */
const SeverityLegend = () => {
  const Labels = useMemo(() => {
    return (
      Object.values(WEATHER_ALERT_SEVERITIES).map(severity => (
        <LabelWrapper key={severity}>
          <Dot fill={alertColors[severity]} />
          <Label severity={severity}>
            {localization.get('alertSeverities')[severity]}
          </Label>
        </LabelWrapper>
      ))
    );
  }, [WEATHER_ALERT_SEVERITIES]);

  return (
    <Wrapper>
      <Title>{`${localization.get('alertSeverityLegend')}:`}</Title>
      <>{Labels}</>
    </Wrapper>
  );
};

export default SeverityLegend;
