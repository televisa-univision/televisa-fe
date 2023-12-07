import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import {
  LIGHT_VARIANT, DARK_VARIANT, LIGHT_ALT, DARK_ALT,
} from '@univision/fe-commons/dist/utils/styled/constants';
import {
  SOCCER,
} from '@univision/fe-commons/dist/constants/sportTypes';
import {
  LARGE, MEDIUM, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import ActionBarWrapper from '@univision/shared-components/dist/components/v3/ActionBarWrapper';
import {
  isValidObject,
} from '@univision/fe-commons/dist/utils/helpers';
import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import localization from '@univision/fe-utilities/localization';
import * as languages from '@univision/fe-utilities/localization/languages';
import { deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import features from '@univision/fe-commons/dist/config/features';

import ShareDrawer from './ShareDrawer';
import Styles from './ActionBar.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const ActionBarStyled = styled(ActionBarWrapper)`${Styles.actionStyled}`;
const CtaShareStyled = styled.div`${Styles.ctaShare}`;

/**
 * Get ActionBar Variant
 * @param {string} type - type of action bar
 * @param {bool} isDark - if component variant is dark
 * @returns {string}
 */
const getActionBarVariant = (type, isDark) => {
  if (type === SOCCER) {
    return isDark ? DARK_ALT : LIGHT_ALT;
  }
  return isDark ? DARK_VARIANT : LIGHT_VARIANT;
};

/**
 * ActionBar Component
 * @param {Object} props - component props
 * @param {function} [props.cancelAutoplay] - needed to cancel autoplay in hero widget
 * @param {string} [props.cardSize] - size of card container
 * @param {string} [props.className] - modifier css class
 * @param {string} [props.contentId] - uid related where the action bar is
 * @param {string} contentTitle - the title of the content
 * @param {string} contentType - the content type of the content
 * @param {boolean} [props.hasFavorite = false] - if true, has add favorite icon
 * @param {number} [props.iconSize] - the size of icons on action bar
 * @param {string} [props.iconType] - the type of outline for the icons
 * @param {bool} [props.isLandscape] - if card is in landscape
 * @param {function} [props.onShareButtonClick] - callback for share buttons
 * @param {string} [props.reactionIconName] - the name for the add reaction button
 * @param {Object} [props.sharingOptions] - share options for social networks
 * @param {string} [props.type] - type of action bar
 * @param {string} [props.variant] - the variant type light or dark
 * @returns {JSX}
 */
const ActionBar = ({
  cancelAutoplay,
  cardSize,
  contentId,
  contentTitle,
  contentType,
  className,
  hasFavorite,
  iconSize,
  iconType,
  isContentLayout,
  isLandscape,
  isListCard,
  onShareButtonClick,
  sharingOptions,
  showCtaShare,
  type,
  variant,
}) => {
  const device = useSelector(deviceSelector);
  const isMobile = device === 'mobile';
  const [isOpen, setIsOpen] = useState(false);
  const isDark = variant === DARK_VARIANT;
  const actionBarVariant = getActionBarVariant(type, isDark);
  const hasShare = isValidObject(sharingOptions);
  const hasLongShareLabel = localization.getCurrentLanguage() === languages.PT;
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const isTelevisaSite = features.televisa.isTelevisaSite();
  /**
   * For handling opening of share drawer to open or close
   */
  const openShare = useCallback(() => {
    setIsOpen(!isOpen);
    if (isValidFunction(cancelAutoplay)) cancelAutoplay(true);
  }, [cancelAutoplay, isOpen]);

  /**
   * For handling to open share component
   */
  const handleOnClick = () => {
    setIsOpen(true);
  };

  return (
    <Wrapper
      className={className}
      isListCard={isListCard}
      isOpen={isOpen}
    >
      <ActionBarStyled
        shareOnPress={openShare}
        hasFavorite={hasFavorite}
        hasShare={hasShare}
        variant={actionBarVariant}
        isContentLayout={isContentLayout}
        iconType={iconType}
        iconSize={iconSize}
        isDark={isDark}
        type={type}
        isLandscape={isLandscape}
        isMobile={isMobile}
        isListCard={isListCard}
        hasLongShareLabel={hasLongShareLabel}
      />
      {hasShare && (
        <ShareDrawer
          contentId={contentId}
          contentTitle={contentTitle}
          contentType={contentType}
          isOpen={isOpen}
          closingFunction={openShare}
          sharingOptions={sharingOptions}
          isMobile={isMobile}
          onClick={onShareButtonClick}
          cardSize={cardSize}
          hasFavorite={hasFavorite}
          theme={variant}
          type={type}
          isDark={isDark}
          isContentLayout={isContentLayout}
          showCtaShare={showCtaShare}
          isLandscape={isLandscape}
          isListCard={isListCard}
          isTelevisaSite={isTelevisaSite}
        />
      )}
      {showCtaShare && isContentLayout && (
        <CtaShareStyled
          className="uvs-font-c-regular"
          isDark={isDark}
          onClick={handleOnClick}
          hasFavorite={hasFavorite}
          isMobile={isMobile}
          isWorldCupMVP={isWorldCupMVP}
          hasLongShareLabel={hasLongShareLabel}
        >
          {localization.get('share')}
        </CtaShareStyled>
      )}
    </Wrapper>
  );
};

ActionBar.propTypes = {
  cancelAutoplay: PropTypes.func,
  cardSize: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  className: PropTypes.string,
  contentId: PropTypes.string,
  contentTitle: PropTypes.string,
  contentType: PropTypes.string,
  hasFavorite: PropTypes.bool,
  iconSize: PropTypes.number,
  iconType: PropTypes.oneOf([SOCCER, '']),
  isContentLayout: PropTypes.bool,
  isLandscape: PropTypes.bool,
  isListCard: PropTypes.bool,
  onShareButtonClick: PropTypes.func,
  sharingOptions: PropTypes.object,
  showCtaShare: PropTypes.bool,
  type: PropTypes.oneOf([SOCCER, '']),
  variant: PropTypes.oneOf([LIGHT_VARIANT, DARK_VARIANT]),
};

ActionBar.defaultProps = {
  iconType: '',
  isLandscape: false,
  isListCard: false,
  type: '',
  variant: LIGHT_VARIANT,
};

export default ActionBar;
