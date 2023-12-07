import React, { useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getKey from '@univision/fe-utilities/helpers/object/getKey';
import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import Header from '@univision/fe-components-base/dist/components/Header';
import StickyWrapper from '@univision/fe-components-base/dist/components/StickyWrapper';
import { setWidgetExtraData } from '@univision/fe-commons/dist/store/actions/page-actions';

import Styled from './SoccerMatchHeader.styles';

const OpeningWrapper = styled.div`${Styled.openingWrapper}`;
const MatchGlobalStyled = Styled.global;
const StickyWrapperStyled = styled(StickyWrapper)`${Styled.sticky}`;

/**
 * Handle the status change of the sticky component
 * @param {Object} self - The component reference
 * @param {Function} dispatch - The Redux dispatch function
 * @returns {Function} - A function that takes a boolean value indicating if the sticky is active
 */
export const onStickyChangeHandler = (self, dispatch) => (isSticky) => {
  const { compact, settings } = self.current;
  if (isSticky !== compact) {
    // eslint-disable-next-line no-param-reassign
    self.current.compact = !!isSticky;
    dispatch(setWidgetExtraData(settings.uid, null, { compact: isSticky }));
  }
};

/**
 * Component representing the SoccerMatchHeader with sticky
 * header and injecting the opening match center
 * @params {Object} props - react props for SoccerMatchHeader
 * @param {(Node|element)} props.openingWidgets - the match center opening widget
 * @param {number} props.matchId - soccer match id if is an opta game
 * @returns {JSX}
 */
function SoccerMatchHeader({
  openingWidget,
  matchId,
}) {
  const self = useRef({
    settings: getKey(openingWidget, 'props.children.props.children.props.settings', {}),
    compact: false,
  });
  const dispatch = useDispatch();

  const onStickyChange = onStickyChangeHandler(self, dispatch);

  return (
    <ErrorBoundary>
      <Header />
      <MatchGlobalStyled />
      {openingWidget && (
        <OpeningWrapper
          className="openingWrapper"
          hasMatchId={isValidValue(matchId)}
        >
          <StickyWrapperStyled onChange={onStickyChange}>
            {openingWidget}
          </StickyWrapperStyled>
        </OpeningWrapper>
      )}
    </ErrorBoundary>
  );
}

SoccerMatchHeader.propTypes = {
  openingWidget: PropTypes.element,
  matchId: PropTypes.number,
};

export default React.memo(SoccerMatchHeader);
