/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import setCacheBuster from '@univision/fe-utilities/helpers/content/setCacheBuster';
import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import Icon from '@univision/fe-icons/dist/components/Icon';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import {
  BITTERSWEET,
  WHITE,
  INTERNATIONAL_ORANGE,
} from '@univision/fe-utilities/styled/constants';
import { MOBILE } from '@univision/fe-commons/dist/constants/devices';
import {
  LIVE_BLOG,
  SECTION,
  EXTERNAL_CONTENT_PROMO,
  LIVE_STREAM,
  ARTICLE,
} from '@univision/fe-commons/dist/constants/contentTypes.json';
import { PRENDETV_24_7, EPG_TUDN_US_URL, EPG_TUDN_MX_URL } from '@univision/fe-commons/dist/constants/urls';
import contentPriorities from '@univision/fe-commons/dist/constants/contentPriorities.json';
import flavors from '@univision/fe-commons/dist/constants/flavors.json';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import { SINGLE_WIDGET_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/singleWidget';
import { PROMO_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/promoCard';
import { getThemeFromVertical } from '@univision/fe-commons/dist/components/ThemeProvider/helpers';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import LiveStream from '@univision/fe-video/dist/components/LiveStream';
import { US } from '@univision/fe-commons/dist/constants/userLocation';
import Timeago from 'react-timeago';
import { getTimeAgoFormatter } from '@univision/fe-commons/dist/utils/datetime';
import {
  SMALL,
  MEDIUM,
  LARGE,
} from '@univision/fe-commons/dist/constants/cardSizes';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import { isVideoAccessRuleAllowed } from '@univision/fe-video/dist/helpers';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import SquareLiveblogPosts from '../../cards/SquareCards/SquareCard/SquareLiveblogPosts';
import SquareBadge from '../../cards/SquareCards/SquareCard/SquareContent/SquareBadge';
import { getSquareCardContentType, getCardLabel } from '../../cards/helpers';
import Picture from '../../Picture';
import Link from '../../Link';
import WidgetTitle from '../WidgetTitle';
import Styles from './SingleWidget.styles';
import RelatedArticleCollection from '../RelatedArticleCollection';
import SoccermatchCard from './SoccermatchCard';

const ActionBarWrapper = styled.div`${Styles.actionBarWrapper}`;
const AspectRatioWrapper = styled.div`${Styles.aspectRatioWrapper}`;
const Content = styled.div`${Styles.content}`;
const ImageWrapper = styled.div`${Styles.imageWrapper}`;
const Label = styled.div`${Styles.label}`;
const LinkTitle = styled(Link)`${Styles.linkTitle}`;
const LinkCategory = styled(Link)`${Styles.linkCategory}`;
const LiveTextWrapper = styled.div`${Styles.liveTextWrapper}`;
const MainWrapper = styled.div`${Styles.mainWrapper}`;
const PictureContent = styled(Picture)`${Styles.pictureContent}`;
const ReadTime = styled.span.attrs({
  className: 'uvs-font-c-regular',
})`${Styles.readTime}`;
const Title = styled.h3`${Styles.title}`;
const TitleLabel = styled.div`${Styles.titleLabel}`;
const TopLiveWrapper = styled.div`${Styles.topLiveWrapper}`;
const CategoryWrapper = styled.div`${Styles.categoryWrapper}`;
const SquareBadgeWrapper = styled(SquareBadge)`${Styles.squareBadgeWrapper}`;
const SquareLiveblogPostsWrapper = styled(SquareLiveblogPosts)`${Styles.squareLiveblogPostsWrapper}`;
const LiveblogContentWrapper = styled.div`${Styles.liveblogContentWrapper}`;
const LastUpdateLabel = styled.div`${Styles.lastUpdateLabel}`;
const TimeAgoWrapper = styled(Timeago)`${Styles.timeAgoWrapper}`;
const ArticleContentWrapper = styled.div`${Styles.articleContentWrapper}`;
const ScheduleTimeWrapper = styled.div`${Styles.scheduleTimeWrapper}`;
const WatchMoreWrapper = styled.span`${Styles.watchMoreWrapper}`;
const WatchingNow = styled.div`${Styles.watchingNow}`;

const ICON_PROPS_247 = {
  prende: {
    name: 'logoPrendeTv',
    fill: BITTERSWEET,
    size: 48,
  },
  vix: {
    name: 'vix',
    fill: INTERNATIONAL_ORANGE,
    height: 48,
    width: 40,
    viewBox: '0 5 122 40',
  },
};

const STATUS_MATCH_PRE = 'previa';

/**
 * Single Widget Component
 * @param {Object} props - component props
 * @returns {JSX}
 */
const SingleWidget = ({
  cardData,
  device,
  forceMobile,
  isLive247,
  isVixEnabled,
  settings,
  time,
  widgetContext,
  theme: cardTheme,
  isTudn,
}) => {
  const [, singleWidgetData] = isValidArray(cardData) ? cardData : [];
  const userLocation = useSelector(userLocationSelector);
  const { isWorldCupMVP } = widgetContext;
  const useVideoFallbackData = (isWorldCupMVP && singleWidgetData?.type === 'video')
    ? !isVideoAccessRuleAllowed(singleWidgetData?.accessRules, userLocation)
    : false;
  const videoFallbackData = singleWidgetData?.videoFallback;
  const isDarkTheme = cardTheme?.isDark;
  const widgetTracking = useCallback(() => WidgetTracker.track(WidgetTracker.events.click, {
    widgetContext,
    target: 'content',
    contentTitle: useVideoFallbackData ? videoFallbackData?.title : singleWidgetData?.title,
    contentUid: useVideoFallbackData ? videoFallbackData?.uid : singleWidgetData?.uid,
    contentType: useVideoFallbackData ? videoFallbackData?.type : singleWidgetData?.type,
  }), [singleWidgetData, widgetContext, useVideoFallbackData, videoFallbackData]);
  const isUS = userLocation === US;
  const urlPrendeTV = isTudn
    && (isUS ? EPG_TUDN_US_URL : EPG_TUDN_MX_URL)
    || `${PRENDETV_24_7}247_videoplaylist`;
  const prendeTvTracking = useCallback(() => WidgetTracker.track(WidgetTracker.events.click, {
    widgetContext,
    target: 'prendetv_cta_external',
    contentTitle: singleWidgetData?.title,
    contentUid: singleWidgetData?.uid,
    contentType: singleWidgetData?.type,
    extraData: {
      destination_url: urlPrendeTV,
    },
    eventLabel: 'Video_Player_Banner',
  }), [singleWidgetData, widgetContext, urlPrendeTV]);

  if (!singleWidgetData) return null;

  const {
    authors,
    articleType,
    cardLabel,
    contentPriority,
    description,
    hierarchy,
    image,
    mostRecentPostPublishDate,
    parent,
    readTime,
    recentPostTitles,
    recentTitledPosts,
    relatedCollection,
    title,
    type,
    uid,
    uri,
    vertical,
  } = (useVideoFallbackData && videoFallbackData) ? videoFallbackData : singleWidgetData;

  const isMobile = device === MOBILE;
  const imageUrl = image?.renditions?.original || {};
  const cardType = getSquareCardContentType(type);
  let imageRatio = SINGLE_WIDGET_RATIOS[device];
  const theme = getThemeFromVertical(hierarchy?.[0]?.uri || uri);
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
  const { flavor, title: widgetTitle } = settings || {};
  const titleLink = settings?.titleLink?.href;
  let videoContent = null;
  const isRelatedContentFlavor = flavor === flavors.RELATED_CONTENTS
    && type === ARTICLE
    && isValidArray(relatedCollection?.contents);
  const relatedArticlesLimit = isMobile ? 1 : 2;

  if (type === EXTERNAL_CONTENT_PROMO || type === SECTION) {
    labelProps.text = vertical;

    if (isMobile) {
      imageRatio = PROMO_CARD_RATIOS.square;
    }
  } else if (type !== LIVE_STREAM
    && type !== LIVE_BLOG
    && contentPriority !== contentPriorities.BREAKING) {
    labelProps = null;
  }
  let league;
  let statusMatch;
  const { isSoccerMatch } = cardType;
  const commonStyleProps = {
    type,
    isRelatedContentFlavor,
    isDarkTheme,
  };
  let propsSoccerMatch;
  if (cardType.isVixPlayer) {
    videoContent = (
      <LazyLoad>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen="true"
          allow="encrypted-media"
          title={singleWidgetData?.title}
          src={setCacheBuster(singleWidgetData?.url?.href)}
        />
      </LazyLoad>
    );
  } else if (cardType.isVideo) {
    videoContent = (
      <VideoPlayer
        {...singleWidgetData}
        widgetData={singleWidgetData}
        hideMeta
        hidePlaylist
        theme={theme}
      />
    );
  } else if (cardType.isLivestream) {
    videoContent = (
      <VideoPlayer
        {...singleWidgetData}
        widgetData={singleWidgetData}
        hideMeta
        hidePlaylist
        theme={theme}
        program={{ title: singleWidgetData?.title }}
      >
        {videoProps => (
          <LiveStream
            {...singleWidgetData}
            videoProps={{ ...videoProps, isLivestream: true }}
          />
        )}
      </VideoPlayer>
    );
  } else if (cardType.isSoccerMatch) {
    statusMatch = singleWidgetData.cardLabel || STATUS_MATCH_PRE;
    league = singleWidgetData?.soccerCompetitionSeason?.soccerCompetition?.name
      ? singleWidgetData?.soccerCompetitionSeason?.soccerCompetition : {};
    propsSoccerMatch = {
      commonStyleProps,
      device,
      forceMobile,
      image,
      imageRatio,
      imageUrl,
      isDarkTheme,
      league,
      singleWidgetData,
      statusMatch,
      theme,
      titleLink,
      widgetTitle,
      widgetTracking,
    };
  }
  return (
    <>
      {isSoccerMatch ? (
        <SoccermatchCard {...propsSoccerMatch} />
      ) : (
        <div>
          <WidgetTitle
            title={widgetTitle}
            singleCard
            titleLink={titleLink}
            isTitleCase={isWorldCupMVP}
          />
          <AspectRatioWrapper forceMobile={forceMobile} isDarkTheme={isDarkTheme}>
            <MainWrapper {...commonStyleProps} forceMobile={forceMobile}>
              <Content {...commonStyleProps} forceMobile={forceMobile}>
                {cardType.isVixPlayer || cardType.isVideo || cardType.isLivestream ? (
                  <>{videoContent}</>
                ) : (
                  <Link href={uri} onClick={widgetTracking}>
                    <PictureContent
                      type={type}
                      alt={title}
                      image={image}
                      overrideImageUrl={getRenditionUrl(
                        imageUrl,
                        imageRatio
                      )}
                      overrideImageBounds={imageRatio}
                    />
                  </Link>
                )}
              </Content>
              <TitleLabel
                {...commonStyleProps}
                isTudn={isTudn}
                isLive247={isLive247}
                forceMobile={forceMobile}
              >
                {isLive247 ? (
                  <TopLiveWrapper isTudn={isTudn}>
                    <ImageWrapper isTudn={isTudn}>
                      {
                        isTudn
                          ? <Icon name="tudn" fill={WHITE} viewBox="4 10 90 5" />
                          : <Icon name="live247" viewBox="0 0 127 20" />
                      }
                    </ImageWrapper>
                    <ScheduleTimeWrapper>
                      {time}
                    </ScheduleTimeWrapper>
                  </TopLiveWrapper>
                ) : (
                  <CategoryWrapper {...commonStyleProps}>
                    {labelProps && (
                      <SquareBadgeWrapper
                        authors={authors}
                        cardLabel={cardLabel}
                        contentPriority={contentPriority}
                        hierarchy={hierarchy}
                        labelProps={labelProps}
                        size={SMALL}
                        type={type}
                        isWorldCupMVP={isWorldCupMVP}
                      />
                    )}
                    {parent && (
                      <LinkCategory href={parent.uri} type={type} isDarkTheme={isDarkTheme}>
                        <Label
                          type={type}
                          isWorldCupMVP={isWorldCupMVP}
                        >{parent.title}
                        </Label>
                      </LinkCategory>
                    )}
                  </CategoryWrapper>
                )}
                <Title {...commonStyleProps} isWorldCupMVP={isWorldCupMVP}>
                  <LinkTitle
                    href={uri}
                    type={type}
                    isTudn={isTudn}
                    onClick={widgetTracking}
                    isDarkTheme={isDarkTheme}
                  >
                    {title}
                  </LinkTitle>
                </Title>
                {(isLive247 || cardType.isVixPlayer) && (
                  <WatchingNow isTudn={isTudn}>
                    {localization.get('watchingNow')}
                  </WatchingNow>
                )}
                {readTime && (
                  <ReadTime>
                    <Icon
                      name="articleCta"
                      size={14}
                      fill={WHITE}
                    />
                    {localization.get('readTime', { locals: { readTime } })}
                  </ReadTime>
                )}
                {isRelatedContentFlavor && (
                  <ArticleContentWrapper>
                    <RelatedArticleCollection
                      articles={relatedCollection.contents.slice(0, relatedArticlesLimit)}
                    />
                  </ArticleContentWrapper>
                )}
              </TitleLabel>
              {type === LIVE_BLOG && isValidArray(recentTitledPosts) && (
                <LiveblogContentWrapper>
                  <div>
                    <LastUpdateLabel isWorldCupMVP={isWorldCupMVP}>{localization.get('latestUpdate')}</LastUpdateLabel>
                    <TimeAgoWrapper
                      isDarkTheme={isDarkTheme}
                      date={mostRecentPostPublishDate}
                      formatter={getTimeAgoFormatter(localization.getCurrentLanguage())}
                    />
                  </div>
                  <SquareLiveblogPostsWrapper
                    recentPostTitles={recentPostTitles}
                    recentTitledPosts={recentTitledPosts}
                    title={title}
                    description={description}
                    uid={uid}
                    size={isMobile ? MEDIUM : LARGE}
                    widgetContext={widgetContext}
                    theme={theme}
                    isDark={isDarkTheme}
                    type={type}
                  />
                </LiveblogContentWrapper>
              )}
              {isLive247 ? (
                <ActionBarWrapper type={type} forceMobile={forceMobile} isDarkTheme={isDarkTheme}>
                  <LiveTextWrapper isTudn={isTudn}>
                    <Icon name="avPlay" size="xsmall" fill="white" />
                    <a target="_blank" rel="noopener noreferrer" href={urlPrendeTV} onClick={prendeTvTracking}>
                      <WatchMoreWrapper>{localization.get('prendetvWatchThis')}</WatchMoreWrapper>
                      <Icon
                        {...(isVixEnabled ? ICON_PROPS_247.vix : ICON_PROPS_247.prende)}
                      />
                    </a>
                  </LiveTextWrapper>
                </ActionBarWrapper>
              ) : (
                null
              )}
            </MainWrapper>
          </AspectRatioWrapper>
        </div>
      )}
    </>
  );
};

SingleWidget.propTypes = {
  cardData: PropTypes.array,
  device: PropTypes.string,
  forceMobile: PropTypes.bool,
  isLive247: PropTypes.bool,
  isVixEnabled: PropTypes.bool,
  settings: PropTypes.object,
  time: PropTypes.string,
  widgetContext: PropTypes.object,
  theme: PropTypes.object,
  isTudn: PropTypes.bool,
};

SingleWidget.defaultProps = {
  widgetContext: {},
};

export default SingleWidget;
