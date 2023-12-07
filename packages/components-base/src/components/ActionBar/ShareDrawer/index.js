import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

import Icon from '@univision/fe-icons/dist/components/Icon';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import { isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import {
  FACEBOOK, TWITTER, WHATSAPP, MAIL,
} from '@univision/fe-commons/dist/constants/socialTypes';
import {
  SOCCER,
} from '@univision/fe-commons/dist/constants/sportTypes';
import {
  LARGE, MEDIUM, SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import { LIGHT_VARIANT, ROUNDED_VARIANT } from '@univision/fe-commons/dist/utils/styled/constants';

import ShareButton from '../../ShareButton';
import {
  variants, OPEN, CLOSED,
} from './ShareDrawer.animation';
import Styles from './ShareDrawer.styles';

const ShareWrapper = styled.div`${Styles.modalWrapper}`;
const ShareContainer = styled(motion.div)`${Styles.shareDrawer}`;
const ShareButtonsWrapper = styled(motion.div)`${Styles.shareButtonsWrapper}`;
const ButtonContainer = styled(motion.div)`${Styles.buttonContainer}`;
const Close = styled(motion.div)`${Styles.close}`;
const ShareButtonStyled = styled(ShareButton).attrs({
  theme: ROUNDED_VARIANT, variant: LIGHT_VARIANT, iconSize: 10,
})`${Styles.shareButton}`;
const Mask = styled(motion.div)`${Styles.mask}`;

/**
 * ShareDrawer Component
 * @param {Object} props - component props
 * @param {string} [props.cardSize] - size of card container
 * @param {function} [props.closingFunction] - the function for the close button
 * @param {string} [props.contentId] - the content ID
 * @param {string} contentTitle - the title of the content
 * @param {string} contentType - the content type of the content
 * @param {bool} [props.hasFavorite = false] - true if it has add favorite button
 * @param {bool} [props.isContentLayout = false] - true if in article layout
 * @param {bool} [props.isDark = false] - true if in dark mode
 * @param {bool} [props.isLandscape = false] - true if in landscape
 * @param {bool} [props.isListCard = false] - true if in list card
 * @param {bool} [props.isMobile] - to know if user is in mobile
 * @param {bool} [props.isOpen = false] - true if share drawer is open
 * @param {function} [props.onClick] - share button callback function
 * @param {Object} [props.sharingOptions] - if true, sets the weather as celsius
 * @param {string} [props.type] - type of share drawer
 * @returns {JSX}
 */
const ShareDrawer = ({
  cardSize,
  closingFunction,
  contentId,
  contentTitle,
  contentType,
  hasFavorite,
  isContentLayout,
  isDark,
  isLandscape,
  isListCard,
  isMobile,
  isOpen,
  onClick,
  sharingOptions,
  type,
  isTelevisaSite,
}) => {
  /**
   * For handling onClick function given social network name
   */
  const handleClick = useCallback(name => (e) => {
    CardTracker.track(
      CardTracker.events.share,
      {
        contentId, share: name, contentTitle, contentType,
      }
    );
    onClick(name, e);
  }, [onClick, contentId, contentTitle, contentType]);

  if (!isValidObject(sharingOptions)) {
    return null;
  }

  const networks = [MAIL, TWITTER, FACEBOOK];
  if (isMobile && !isTelevisaSite) {
    networks.splice(2, 0, WHATSAPP);
  }

  return (
    <AnimatePresence>
      {isOpen
        && (
          <ShareWrapper>
            <ShareContainer
              initial={CLOSED}
              animate={OPEN}
              exit={CLOSED}
              variants={variants.drawer}
              isOpen={isOpen}
              type={type}
              isDark={isDark}
              isContentLayout={isContentLayout}
              isMobile={isMobile}
              isListCard={isListCard}
            >
              <ShareButtonsWrapper
                variants={variants.buttonWrapper}
                separator={cardSize}
                hasFavorite={hasFavorite}
                isContentLayout={isContentLayout}
                isLandscape={isLandscape}
                isListCard={isListCard}
              >
                {networks.map(name => (
                  <ButtonContainer
                    key={name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    variants={variants.buttons}
                    separator={cardSize}
                    isContentLayout={isContentLayout}
                    isListCard={isListCard}
                  >
                    <ShareButtonStyled
                      name={name}
                      sharingOptions={sharingOptions}
                      onClick={handleClick && handleClick(name)}
                    />
                  </ButtonContainer>
                ))}
              </ShareButtonsWrapper>
              <Close
                onClick={closingFunction}
                variants={variants.close}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                hasFavorite={hasFavorite}
                isLandscape={isLandscape}
                isListCard={isListCard}
              >
                <Icon name="close" size={16} />
              </Close>
            </ShareContainer>
            <Mask isListCard={isListCard} />
          </ShareWrapper>
        )}
    </AnimatePresence>
  );
};

ShareDrawer.propTypes = {
  cardSize: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  closingFunction: PropTypes.func,
  contentId: PropTypes.string,
  contentTitle: PropTypes.string,
  contentType: PropTypes.string,
  hasFavorite: PropTypes.bool,
  isContentLayout: PropTypes.bool,
  isDark: PropTypes.bool,
  isLandscape: PropTypes.bool,
  isListCard: PropTypes.bool,
  isMobile: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
  sharingOptions: PropTypes.object,
  type: PropTypes.oneOf([SOCCER, '']),
  isTelevisaSite: PropTypes.bool,
};

ShareDrawer.defaultProps = {
  type: '',
  isDark: false,
};

export default React.memo(ShareDrawer);
