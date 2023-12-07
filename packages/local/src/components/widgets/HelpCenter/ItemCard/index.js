import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { HORIZONTAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import { BLACK } from '@univision/fe-utilities/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';

import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';
import Styles from './ItemCard.styles';

const ArrowItem = styled(Icon)`${Styles.arrowItem}`;
const AvatarItem = styled.img`${Styles.avatarItem}`;
const Wrapper = styled.a`${Styles.wrapper}`;
const ICON_SIZE = 20;
const defaultLogo = 'https://st1.uvnimg.com/3a/60/ff8a1c114b0cb94b76cf39d1fdaa/newversion.jpg';

/**
 * List Card
 * @param {string} className - Class name modifier class
 * @param {Object} logo - the card image
 * @param {string} title - the card title
 * @param {bool} isDark - true if it is in dark mode
 * @param {bool} isTextOnly - true if it is only text
 * @param {string} layout -the card layout
 * @param {string} style -the card layout
 * @param {bool} listGrid - true if it is List grid
 * @param {string} uri - href link
 * @param {int} index - card id
 * @param {function} trackEvent - the tracking callback
 * @access public
 * @returns {JSX}
 */
const ItemCard = ({
  className,
  logo,
  title,
  isDark,
  isTextOnly,
  layout,
  style,
  listGrid,
  uri,
  index,
  trackEvent,
  widgetContext,
}) => {
  const track = useCallback(() => {
    if (isValidFunction(trackEvent)) trackEvent(title, index, widgetContext);
  }, [trackEvent, title, index, widgetContext]);
  return (
    <Wrapper
      href={uri?.href}
      target="_blank"
      className={className}
      style={style}
      isDark={isDark}
      layout={layout}
      isTextOnly={isTextOnly}
      listGrid={listGrid}
      onClick={track}
    >
      <AvatarItem src={logo?.renditions?.original?.href || defaultLogo} alt="Avatar-Item" />
      {title}
      <ArrowItem name="arrowRight" size={ICON_SIZE} fill={BLACK} />
    </Wrapper>
  );
};

ItemCard.propTypes = {
  isDark: PropTypes.bool,
  isTextOnly: PropTypes.bool,
  listGrid: PropTypes.bool,
  className: PropTypes.string,
  logo: PropTypes.object,
  title: PropTypes.string,
  layout: PropTypes.string,
  style: PropTypes.string,
  uri: PropTypes.object,
  index: PropTypes.number,
  trackEvent: PropTypes.func,
  widgetContext: PropTypes.object,
};

ItemCard.defaultProps = {
  isDark: false,
  isTextOnly: false,
  layout: HORIZONTAL,
};

export default ItemCard;
