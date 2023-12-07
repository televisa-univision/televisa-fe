import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import ScoreCard from '@univision/shared-components/dist/components/v3/ScoreCard';
import Link from '@univision/fe-components-base/dist/components/Link';
import { US, MX } from '@univision/fe-commons/dist/constants/userLocation';
import Icon from '@univision/fe-icons';
import localization from '@univision/fe-utilities/localization/tudn';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import Styles from './ScoreCellList.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

const StyledLink = styled(Link)`
  ${Styles.link}
`;

const StyledScoreCard = styled(ScoreCard)`
  ${Styles.scoreCard}
`;

const VixLinkWrapper = styled.div`
  ${Styles.vixLinkWrapper}
`;

const VixLinkStyled = styled(Link)`
  ${Styles.vixLink}
`;

const VixLinkLabel = styled.span`
  ${Styles.vixLinkLabel}
`;

const ScoreCell = styled.div`
  ${Styles.scoreCell}
`;

/**
 * Renders a list of scorecells
 * @param {Object} props - component props
 * @returns {JSX}
 */
const ScoreCellList = ({
  className,
  matches,
  userLocation,
  widgetContext,
}) => {
  const isMX = userLocation === MX;

  const trackVixClick = useCallback((card) => {
    const { key, eventName, vixExternalLink } = card;
    WidgetTracker.track(
      WidgetTracker.events.click,
      {
        widgetContext,
        target: 'prendetv_cta_external',
        contentUid: key,
        contentTitle: eventName,
        extraData: {
          destination_url: vixExternalLink,
        },
      }
    );
  }, [widgetContext]);

  const trackClick = useCallback((card) => {
    const { key, eventName } = card;
    WidgetTracker.track(
      WidgetTracker.events.click,
      {
        widgetContext,
        target: 'content',
        contentUid: key,
        contentTitle: eventName,
        contentType: 'soccermatch',
      }
    );
  }, [widgetContext]);

  const list = useMemo(() => {
    if (!isValidArray(matches)) {
      return null;
    }

    return matches.map((card) => {
      const { away, home, vixExternalLink } = card;
      const vixLink = isMX && vixExternalLink
        ? (
          <VixLinkWrapper>
            <VixLinkStyled href={vixExternalLink} target="_blank" onClick={() => trackVixClick(card)}>
              <VixLinkLabel>{localization.get('watchOn')}</VixLinkLabel>
              <Icon name="vix" width={40} height={15} viewBox="0 0 80 35" />
            </VixLinkStyled>
          </VixLinkWrapper>
        )
        : null;

      return (
        <ScoreCell key={card?.key}>
          <StyledLink href={card?.url} onClick={() => trackClick(card)}>
            <StyledScoreCard
              {...card}
              type="cell"
              teams={{
                away,
                home,
              }}
            />
          </StyledLink>
          {vixLink}
        </ScoreCell>
      );
    });
  }, [matches, isMX, trackVixClick, trackClick]);

  return (
    <Wrapper className={className}>
      {list}
    </Wrapper>
  );
};

ScoreCellList.propTypes = {
  className: PropTypes.string,
  matches: PropTypes.array,
  userLocation: PropTypes.string,
  widgetContext: PropTypes.object,
};

ScoreCellList.defaultProps = {
  userLocation: US,
  widgetContext: {},
};

export default ScoreCellList;
