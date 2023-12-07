import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import SquareBadge from './SquareBadge';
import SquareCTA from './SquareCTA';
import SquareTitle from './SquareTitle';
import Styles from './SquareContent.styles';

const Content = styled.div`
  ${Styles.content}
`;

/**
 * Renders square card content
 * @param {!Object} props - component props
 * @param {Object} [props.authors] - the authors for the story
 * @param {string} [props.advertisementBrand] - the advertisement brand
 * @param {string} [props.cardLabel] - the card label
 * @param {string} [props.className] - Class name modifier class
 * @param {string} [props.contentPriority] - content priority for this card
 * @param {Object} [props.contentOptions] - the content options of the card
 * @param {string} [props.durationString] - the video duration
 * @param {array} [props.hierarchy] - the hierarchy of the content
 * @param {bool} [props.isDark = false] - true if it is in dark mode
 * @param {bool} [props.isInlineVideo = false] - true if it is inline
 * @param {string} [props.link] - redirect link
 * @param {number} [props.readTime] - the approximate reading time for article
 * @param {string} [props.size] - the card size
 * @param {number} [props.slideCount] - the total slide show count
 * @param {Object} [props.sponsor] - sponsor info
 * @param {style} [props.style] - Modifier style
 * @param {Object} [props.cardTheme] - the card theme object
 * @param {string} [props.title] - the card title
 * @param {Object} [props.theme] - the vertical theme object
 * @param {string} [props.type] -the card type
 * @param {string} [props.uid] - the card uid
 * @param {string} [props.uri] - the card uri
 * @param {Object} [props.updateDate] - the card latest update
 * @param {Object} [props.widgetContext] - the card widget context
 * @returns {JSX}
 */
const SquareContent = ({
  advertisementBrand,
  authors,
  cardLabel,
  className,
  contentPriority,
  contentOptions,
  durationString,
  hierarchy,
  isDark,
  isInlineVideo,
  labelProps,
  link,
  readTime,
  size,
  slideCount,
  sponsor,
  style,
  cardTheme,
  title,
  theme,
  trackClick,
  trackClickOther,
  type,
  uid,
  uri,
  updateDate,
  widgetContext,
}) => (
  <Content
    className={className}
    style={style}
    contentOptions={contentOptions}
    isInlineVideo={isInlineVideo}
    type={type}
    size={size}
  >
    {(contentOptions?.showBadge) && (
      <SquareBadge
        authors={authors}
        cardLabel={cardLabel}
        contentPriority={contentPriority}
        hierarchy={hierarchy}
        labelProps={labelProps}
        size={size}
        trackClickOther={trackClickOther}
        type={type}
        isWorldCupMVP={widgetContext?.isWorldCupMVP}
      />
    )}
    {(contentOptions?.showTitle) && (
      <SquareTitle
        isDark={isDark}
        isInlineVideo={isInlineVideo}
        size={size}
        theme={cardTheme}
        title={title}
        type={contentOptions?.titleTypeOverride || type}
        uri={uri}
        trackClick={trackClick}
        target={link?.target || contentOptions?.target}
        useExplicitNavigation={contentOptions?.useExplicitNavigation}
        showBadge={contentOptions?.showBadge}
      />
    )}
    {contentOptions?.showCTA && (
      <SquareCTA
        advertisementBrand={advertisementBrand}
        authors={authors}
        durationString={durationString}
        hierarchy={hierarchy}
        isDark={isDark}
        isInlineVideo={isInlineVideo}
        readTime={readTime}
        size={size}
        slideCount={slideCount}
        sponsor={sponsor}
        theme={theme}
        title={title}
        trackClick={trackClick}
        type={type}
        uri={uri}
        uid={uid}
        updateDate={updateDate}
        widgetContext={widgetContext}
      />
    )}
  </Content>
);

SquareContent.propTypes = {
  authors: PropTypes.array,
  advertisementBrand: PropTypes.string,
  cardLabel: PropTypes.string,
  cardTheme: PropTypes.object,
  className: PropTypes.string,
  contentPriority: PropTypes.string,
  contentOptions: PropTypes.object,
  durationString: PropTypes.string,
  isDark: PropTypes.bool,
  isInlineVideo: PropTypes.bool,
  hierarchy: PropTypes.array,
  labelProps: PropTypes.object,
  link: PropTypes.string,
  readTime: PropTypes.number,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  slideCount: PropTypes.number,
  sponsor: PropTypes.object,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  title: PropTypes.string,
  theme: PropTypes.object,
  trackClick: PropTypes.func,
  trackClickOther: PropTypes.func,
  type: PropTypes.string,
  uri: PropTypes.string,
  uid: PropTypes.string,
  updateDate: PropTypes.string,
  widgetContext: PropTypes.object,
};

SquareContent.defaultProps = {
  isDark: false,
};

export default SquareContent;
