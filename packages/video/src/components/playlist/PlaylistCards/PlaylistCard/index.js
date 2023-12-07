import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { scrollTo } from '@univision/fe-commons/dist/utils/helpers';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import localization from '@univision/fe-utilities/localization';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import ListCard from '@univision/fe-components-base/dist/components/cards/SquareCards/ListCard';
import {
  DARK_VARIANT,
} from '@univision/fe-utilities/styled/constants';
import { VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import ActionBar from '@univision/fe-components-base/dist/components/ActionBar';
import features from '@univision/fe-commons/dist/config/features';

import Styles from './PlaylistCard.styles';

const WrapperStyled = styled.div`${Styles.wrapper}`;
const ExternalWrapper = styled.div`${Styles.external}`;
const OverlayStyled = styled.div`${Styles.overlay}`;
const ListCardStyled = styled(ListCard)`${Styles.listCard}`;
const ActionBarStyled = styled(ActionBar)`
  ${Styles.actionBar}
`;

/**
 * Scroll to active playlist element, climbs up the chain to find playlist wrapper
 * @param {Node} cardRef - card item reference node
 * @param {Node} playlistInnerRef - parent playlist reference node
 * @param {Object} [options] - parameter to customize scroll bbahavior
 * @param {boolean} [options.autoScroll] - true if auto scroll is enable
 * @param {number} [options.duration] - animation duration on scroll
 * @param {boolean} [options.isMultiTab] - if the playlist has tabs to add padding on scroll
 */
function maybeScrollActiveCard(cardRef, playlistInnerRef, options) {
  const { autoScroll, duration = 400, isMultiTab } = options;
  if (autoScroll && cardRef && playlistInnerRef) {
    const paddingTop = isMultiTab ? 55 : 5;
    const cardOffsetTop = cardRef.offsetTop - paddingTop;

    scrollTo(playlistInnerRef, cardOffsetTop, duration);
  }
}

/**
 * Playlist card item using standart list card
 * @param {Object} props component props
 * @param {boolean} [props.autoScroll] - true enable auto scroll in the playlist
 * @param {string} [props.className] - modifier class name
 * @param {Object} props.content - playlist items content for the card
 * @param {number} props.contentIndex - index position of the item on the list
 * @param {string} props.layout - card layout variant, horizontal or vertical
 * @param {boolean} props.isActiveItem - true if the current card is active
 * @param {boolean} [props.isMultiTab] - true if playlists has multi tab enable
 * @param {function} props.onClick - click event callback handler
 * @param {DOMElement} props.playlistInnerRef - playlists element to scroll if auoscroll is enable
 * @param {boolean} [props.useShortTitle] - true use short titl in the card instead of regular title
 * @param {string} [props.variant] - theme variant light or dark
 * @param {Object} props.widgetContext - parent widget context information
 * @returns {JSX}
 */
function PlaylistCard({
  autoScroll,
  className,
  content,
  contentIndex,
  layout,
  isActiveItem,
  isMultiTab,
  onClick,
  playlistInnerRef,
  playlistBelowPlayer,
  useShortTitle,
  variant,
  widgetContext,
  hideActionBar,
}) {
  const cardRef = useRef();
  const title = useShortTitle ? content.shortTitle : content.title;
  let overlay;
  const cardThemeData = isValidArray(content?.hierarchy) ? content.hierarchy[0]?.uri : content?.uri;
  const cardTheme = getThemeFromVertical(cardThemeData);
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  if (isActiveItem) {
    overlay = (
      <OverlayStyled className="uvs-font-c-bold" isWorldCupMVP={isWorldCupMVP}>
        {localization.get('youAreWatching')}
      </OverlayStyled>
    );
    maybeScrollActiveCard(cardRef?.current, playlistInnerRef, {
      autoScroll,
      isMultiTab,
    });
  }

  /**
   * Card on click handler to send content item to parent
   * @param {Object} event - javascript click event
   */
  function onClickHandler(event) {
    if (isValidFunction(onClick)) {
      onClick(event.nativeEvent, contentIndex);
    }
  }

  return (
    <ExternalWrapper
      className={className}
    >
      <WrapperStyled
        onClick={onClickHandler}
        ref={cardRef}
      >
        <ListCardStyled
          {...content}
          title={title}
          overlay={overlay}
          preventFollowClick
          layout={layout}
          isDark={variant === DARK_VARIANT}
          widgetContext={widgetContext}
          data-content={contentIndex}
          hideActionBar
          theme={cardTheme}
          hideText={playlistBelowPlayer}
        />
      </WrapperStyled>
      {layout !== VERTICAL && !hideActionBar && (
        <ActionBarStyled
          sharingOptions={content?.sharingOptions || content?.sharing?.options}
          variant={variant}
          iconSize={24}
          isListCard
          type={cardTheme?.actionBarType}
        />
      )}
    </ExternalWrapper>
  );
}

PlaylistCard.propTypes = {
  autoScroll: PropTypes.bool,
  className: PropTypes.string,
  content: PropTypes.object.isRequired,
  contentIndex: PropTypes.number,
  layout: PropTypes.string,
  isActiveItem: PropTypes.bool,
  isMultiTab: PropTypes.bool,
  onClick: PropTypes.func,
  playlistBelowPlayer: PropTypes.bool,
  playlistInnerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
  ]),
  useShortTitle: PropTypes.bool,
  variant: PropTypes.oneOf(['light', 'dark']),
  widgetContext: PropTypes.object,
  hideActionBar: PropTypes.bool,
  hideText: PropTypes.bool,
};

PlaylistCard.defaultProps = {
  useShortTitle: false,
  hideActionBar: false,
};

export default PlaylistCard;
