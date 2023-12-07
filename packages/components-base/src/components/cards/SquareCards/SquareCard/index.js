import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isInArray from '@univision/fe-utilities/helpers/array/isInArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import getPropsByKeyList from '@univision/fe-utilities/helpers/object/getPropsByKeyList';
import {
  LARGE,
  MEDIUM,
  SMALL,
} from '@univision/fe-commons/dist/constants/cardSizes';
import {
  LOADING, SUCCESS, ERROR,
} from '@univision/fe-commons/dist/constants/status';
import { ADVERTISING } from '@univision/shared-components/dist/constants/labelTypes';
import {
  ARTICLE,
  BASIC_SOCCER_MATCH,
  EXTERNAL_LINK,
  SLIDESHOW,
  VIDEO,
  LIVE_BLOG,
  LIVE_STREAM,
  SHOW,
  SECTION,
  SOCCER_MATCH,
  SOCCER_PERSON,
  PODCAST_EPISODE,
  PODCAST_SERIES,
  PERSON,
  RADIO_STATION,
  TV_STATION,
  EXTERNAL_CONTENT_PROMO,
} from '@univision/fe-commons/dist/constants/contentTypes';
import { CONECTA } from '@univision/fe-commons/dist/constants/feedConsumer';
import { shouldRenderBySchedule } from '@univision/fe-commons/dist/utils/helpers/dateTimeUtils';
import LocalizationManager from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import { STANDARD } from '@univision/fe-commons/dist/constants/contentPriorities';
import useReactionsCount from '@univision/fe-commons/dist/hooks/useReactionsCount';

import { getCardLabel } from '../../helpers';
import Styles from './SquareCard.styles';
import SquareCardSizer from '../SquareCardSizer';
import SquareContent from './SquareContent';
import getSquareCardType from './helpers/getSquareCardType';
import getSquareCardTypeName from './helpers/getSquareCardTypeName';
import getContentOptions from './helpers/getContentOptions';
import cardMapping from '../cardMapping';

export const validSquareTypes = [
  ARTICLE,
  ADVERTISING,
  BASIC_SOCCER_MATCH,
  EXTERNAL_LINK,
  LIVE_BLOG,
  LIVE_STREAM,
  SLIDESHOW,
  VIDEO,
  SHOW,
  SECTION,
  SOCCER_MATCH,
  SOCCER_PERSON,
  PODCAST_EPISODE,
  PODCAST_SERIES,
  PERSON,
  RADIO_STATION,
  TV_STATION,
  EXTERNAL_CONTENT_PROMO,
];

const StyledSquareCardSizer = styled(SquareCardSizer)`
  ${Styles.cardSizer}
`;
const Wrapper = styled.div`
  ${Styles.wrapper}
`;

/**
 * Container component for Square Cards
 * @param {!Object} props - Props for this component
 * @param {bool} [props.active] - Live stream is active
 * @param {string} [props.articleType] - The type of article
 * @param {bool} [props.auth] - Live stream has auth
 * @param {Object} [props.authors] - the authors for the story
 * @param {string} [props.advertisementBrand] - the advertisement brand
 * @param {Object} [props.awayTeamSeason] - the away team object
 * @param {array} [props.cardImages] - List of images
 * @param {string} [props.cardLabel] - the card label
 * @param {string} [props.className] - Class name modifier class
 * @param {string} [props.contentPriority] - content priority for this card
 * @param {string} [props.description] - card description
 * @param {string} [props.durationString] - the video duration
 * @param {string} [props.feedConsumer] - Text that represents consumer content
 * @param {bool} [props.hasFavorite = false] - true if has favorite icon
 * @param {array} [props.hierarchy] - the hierarchy of the content
 * @param {Object} [props.homeTeamSeason] - the home team object
 * @param {Object} [props.image] - the card image
 * @param {bool} [props.isDark = false] - true if it is in dark mode
 * @param {bool} [props.isInlineVideo = false] - true if it is inline
 * @param {string} [props.livestreamId] - Live stream id
 * @param {Object} [props.liveStreamType] - Soccer match live streams
 * @param {string} [props.mainImage] - Live stream main promo image
 * @param {number} [props.matchId] - the match id
 * @param {string} [props.mcpid] - Video mcpid
 * @param {string} [props.playerType] - Player type
 * @param {Object} [props.primaryTag] - Primary tag
 * @param {array} [props.reactions] - the reactions array
 * @param {array} [props.recentPostTitles] - List of latest titles for this blog
 * @param {array} [props.recentTitledPosts] - List of latest posts with titles
 * @param {number} [props.readTime] - the approximate reading time for article
 * @param {Object} [props.schedule] - schedule object
 * @param {Object} [props.sharing] - the sharing options object
 * @param {bool} [props.showNative] - Should this card shows native
 * @param {string} [props.size] - the size of the card
 * @param {number} [props.slideCount] - the total slides count of the slide show
 * @param {Object} [props.soccerCompetitionSeason] - the soccer competition object
 * @param {style} [props.style] - Modifier style
 * @param {Object} [props.theme] - the theme object
 * @param {string} [props.title] - the card title
 * @param {string} [props.tvssUrl] - The tvssUrl
 * @param {string} [props.type] -the card type
 * @param {string} [props.uri] - the card uri
 * @param {string} [props.uid] - the card uid
 * @param {string} [props.vertical] - the vertical the content belongs to
 * @param {Object} [props.widgetContext] - the card widget context
 * @access public
 * @returns {JSX}
 */
const SquareCard = (props) => {
  const {
    active,
    auth,
    authors,
    advertisementBrand,
    articleType,
    awayTeamSeason,
    cardImages,
    cardLabel,
    className,
    contentPriority,
    description,
    durationString,
    enableDai,
    feedConsumer,
    hasFavorite,
    hierarchy,
    homeTeamSeason,
    horoscopeData,
    image,
    isDark,
    isInlineVideo,
    livestreamId,
    liveStreamType,
    mainImage,
    matchId,
    mcpid,
    playerType,
    primaryTag,
    reactions,
    recentPostTitles,
    recentTitledPosts,
    readTime,
    schedule,
    size,
    sharing,
    slideCount,
    showNative,
    soccerCompetitionSeason,
    status,
    style,
    theme,
    title,
    type,
    tvssUrl,
    uid,
    uri,
    updateDate,
    vertical,
    widgetContext,
    ...otherProps
  } = props;

  const reactionsCount = useReactionsCount({
    uid, hasActionBar: true,
  });

  if (!isInArray(validSquareTypes, type)) {
    return null;
  }

  let labelProps = getCardLabel({
    authors,
    articleType,
    cardLabel,
    contentPriority,
    hierarchy,
    uri,
    type,
    vertical,
  });
  const isLiveStreamMatch = isValidObject(liveStreamType);
  const squareCardType = getSquareCardType({
    isLiveStreamMatch,
    isInlineVideo,
    articleType,
    type,
    status,
  });
  const trackClick = CardTracker.onClickHandler(
    { uid, title, reactionsCount },
    widgetContext
  );
  const trackClickOther = CardTracker.onClickHandler(
    { uid, title, reactionsCount },
    widgetContext,
    'content_other'
  );

  const sharingOptions = sharing?.options || {};
  const cardTheme = isValidObject(theme?.card) ? theme.card : {};

  /**
   * TO-DO: Consolidate these 3 values to rely only on the square card types once we move away
   * from the old cards
   */
  const cardName = getSquareCardTypeName({ squareCardType });
  const inDarkMode = cardTheme.isDark?.[cardName]
    || cardTheme?.isDark?.default
    || isDark;

  let isConectaFeed;
  const isConecta = feedConsumer === CONECTA;
  if (isConecta) {
    isConectaFeed = shouldRenderBySchedule(schedule?.schedules);
    labelProps = {
      href: uri,
      type: 'opinion',
      text: LocalizationManager.get('vote'),
    };
  }
  const cardContentOptions = getContentOptions({
    cardName, cardLabel, isConecta, isConectaFeed, status,
  });

  const commonProps = {
    title,
    description,
    uid,
    uri,
    size,
    widgetContext,
    isDark: inDarkMode,
    trackClick,
    trackClickOther,
    image,
    theme,
  };
  const content = (
    <SquareContent
      {...commonProps}
      advertisementBrand={advertisementBrand}
      authors={authors}
      cardLabel={cardLabel}
      contentOptions={cardContentOptions}
      contentPriority={contentPriority}
      durationString={durationString}
      hierarchy={hierarchy}
      isConectaFeed={isConectaFeed}
      isInlineVideo={isInlineVideo}
      labelProps={labelProps}
      readTime={readTime}
      slideCount={slideCount}
      cardTheme={cardTheme}
      updateDate={updateDate}
      type={cardName}
      {...otherProps}
    />
  );

  const cardProps = cardMapping[squareCardType];
  const { loader: Card, extraProps } = cardProps;

  const cardProperties = getPropsByKeyList({ ...props, isConectaFeed }, extraProps);

  return (
    <StyledSquareCardSizer
      className={className}
      contentId={uid}
      contentTitle={title}
      contentType={type}
      style={style}
      sharingOptions={sharingOptions}
      isVideo={type === VIDEO}
      isDark={inDarkMode}
      hasActionBar={cardContentOptions.hasActionBar}
      hasFavorite={hasFavorite}
      reactions={reactions}
      actionBarType={theme?.actionBarType}
      {...commonProps}
    >
      <Wrapper type={type}>
        <Card
          {...commonProps}
          {...otherProps}
          {...cardProperties}
          type="square"
        />
        {!cardContentOptions.hideContent && content}
      </Wrapper>
    </StyledSquareCardSizer>
  );
};

SquareCard.propTypes = {
  active: PropTypes.bool,
  articleType: PropTypes.string,
  advertisementBrand: PropTypes.string,
  auth: PropTypes.bool,
  authors: PropTypes.array,
  awayTeamSeason: PropTypes.object,
  cardImages: PropTypes.array,
  cardLabel: PropTypes.string,
  className: PropTypes.string,
  contentPriority: PropTypes.string,
  description: PropTypes.string,
  durationString: PropTypes.string,
  enableDai: PropTypes.bool,
  feedConsumer: PropTypes.bool,
  hasFavorite: PropTypes.bool,
  image: PropTypes.shape({
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  hierarchy: PropTypes.array,
  homeTeamSeason: PropTypes.object,
  horoscopeData: PropTypes.object,
  isDark: PropTypes.bool,
  isInlineVideo: PropTypes.bool,
  livestreamId: PropTypes.string,
  liveStreamType: PropTypes.object,
  mainImage: PropTypes.string,
  matchId: PropTypes.number,
  mcpid: PropTypes.string,
  playerType: PropTypes.string,
  primaryTag: PropTypes.object,
  reactions: PropTypes.array,
  recentPostTitles: PropTypes.array,
  recentTitledPosts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      uri: PropTypes.string,
    })
  ),
  readTime: PropTypes.number,
  schedule: PropTypes.object,
  sharing: PropTypes.object,
  showNative: PropTypes.bool,
  size: PropTypes.oneOf([LARGE, MEDIUM, SMALL]),
  status: PropTypes.oneOf([SUCCESS, LOADING, ERROR]),
  slideCount: PropTypes.number,
  soccerCompetitionSeason: PropTypes.shape({
    soccerCompetition: PropTypes.shape({
      name: PropTypes.string,
      league: PropTypes.shape({
        uri: PropTypes.string,
        logo: PropTypes.shape({
          renditions: PropTypes.object,
        }),
      }),
    }),
  }),
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  theme: PropTypes.object,
  title: PropTypes.string,
  tvssUrl: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
  uid: PropTypes.string,
  updateDate: PropTypes.string,
  vertical: PropTypes.string,
  widgetContext: PropTypes.object,
};

SquareCard.defaultProps = {
  contentPriority: STANDARD,
  isDark: false,
  isInlineVideo: false,
  size: MEDIUM,
  reactions: [],
  hasFavorite: false,
};

export default SquareCard;
