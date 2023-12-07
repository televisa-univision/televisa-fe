import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import Button from '@univision/shared-components/dist/components/v3/Button';
import localization from '@univision/fe-utilities/localization/tudn';
import Link from '@univision/fe-components-base/dist/components/Link';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import StandingGroup from './StandingGroup';
import Styles from './Standings.styles';

const Wrapper = styled.div`
  ${Styles.wrapper}
`;

const StandingGroupStyled = styled(StandingGroup)`
  ${Styles.standingGroup}
`;

const MoreButton = styled.div`
  ${Styles.moreButton}
`;

const StyledButton = styled(Button)`
  ${Styles.button}
`;

const GROUPS_TO_BE_DISPLAYED = 4;

/**
 * Standings component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const Standings = ({
  sections,
  viewMoreLink,
  widgetContext,
}) => {
  const groups = useMemo(() => {
    if (!isValidArray(sections)) {
      return null;
    }

    return sections.slice(0, GROUPS_TO_BE_DISPLAYED)
      .map(item => (
        <StandingGroupStyled {...item} />
      ));
  }, [sections]);

  const trackClick = useCallback(() => {
    WidgetTracker.track(WidgetTracker.events.click, {
      widgetContext,
      target: 'subnav-wcwidget-ver-posiciones',
    });
  }, [widgetContext]);

  return (
    <Wrapper>
      {groups}
      {viewMoreLink && (
        <MoreButton>
          <Link
            href={viewMoreLink}
            onClick={trackClick}
            checkUserLocation
          >
            <StyledButton
              useIcon={false}
            >
              {localization.get('viewAllStandings')}
            </StyledButton>
          </Link>
        </MoreButton>
      )}
    </Wrapper>
  );
};

Standings.propTypes = {
  sections: PropTypes.array,
  viewMoreLink: PropTypes.string,
  widgetContext: PropTypes.object,
};

Standings.defaultProps = {
  widgetContext: {},
};

export default Standings;
