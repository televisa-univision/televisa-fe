import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import Styles from './SquareCardSizer.styles';

const Container = styled.div`
  ${Styles.container}
`;
const AspectRatioBox = styled.div`
  ${Styles.aspectRatioBox}
`;
const InnerAspectRatioBox = styled.div`
  ${Styles.innerAspectRatioBox}
`;

/**
 * Component for sizing all cards according to their size
 * @param {Object} props component props
 * @param {Object} [props.actionBarType] - the type of action bar
 * @param {string} [props.className] - Class name modifier class
 * @param {string} contentId - content id to be tracked
 * @param {string} contentTitle - the title of the content
 * @param {string} contentType - the content type of the content
 * @param {string} [props.device] - current device
 * @param {bool} [props.hasFavorite = false] - true if has favorite icon
 * @param {bool} [props.isDark = false] - true if it should use dark mode
 * @param {bool} [props.isVideo = false] - true if it is video content type
 * @param {array} [props.reactions] - the reactions array
 * @param {function} [props.onClick] - share callback
 * @param {Object} [props.sharingOptions] - share options for social networks
 * @param {string} [props.size] - size of card container
 * @param {style} [props.style] - Modifier style
 * @returns {JSX}
 */
const SquareCardSizer = ({
  children,
  className,
  isVideo,
  size,
  style,
}) => (
  // TODO: Cleanup, consolidate reactionIconName into one icon once UVN redesign is released
  <Container className={className} style={style} size={size}>
    <AspectRatioBox size={size} isVideo={isVideo}>
      <InnerAspectRatioBox>{children}</InnerAspectRatioBox>
    </AspectRatioBox>
  </Container>
);

SquareCardSizer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  isVideo: PropTypes.bool,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]).isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default SquareCardSizer;
