import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import { HORIZONTAL, VERTICAL } from '@univision/fe-commons/dist/constants/layoutTypes';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import { STANDARD } from '@univision/fe-commons/dist/constants/contentPriorities';
import widgetFlavor from '@univision/fe-commons/dist/constants/widgetFlavors';

import {
  SEA_BUCKTHORN,
  GALLERY_GREY,
  WHITE,
  BLACK_GREY,
  GREEN_DARKER,
} from '@univision/fe-utilities/styled/constants';
import Label from '@univision/shared-components/dist/components/v3/Label';
import { stripTagsHtml } from '@univision/fe-commons/dist/utils/helpers';
import features from '@univision/fe-commons/dist/config/features';
import { getSquareCardContentType, getCardLabel, getValidationMVP } from '../../helpers';

import VideoProgressBar from '../../VideoProgressBar';
import SquareScoreCardConnector from '../SquareCard/SquareScoreCard/SquareScoreCardConnector';
import Link from '../../../Link';
import Title from '../../../Title';
import ListCardImage from './ListCardImage';
import ListContent from './ListContent';
import Styles from './ListCard.styles';
import StylesLayoutListCard from './ListCardLayout.styles';

const Badge = styled('div')`${Styles.badge}`;
const Description = styled('p').attrs({ className: 'uvs-font-a-light' })`${Styles.description}`;
const DynamicAspectRatio = styled.div`${Styles.dynamicAspectRatio}`;
const LabelLink = styled(({ theme, ...rest }) => <Link {...rest} />)`${Styles.labelLink}`;
const LabelMVP = styled(Label)`${StylesLayoutListCard.labelMVP}`;
const LabelCustom = styled(Label)`${Styles.labelCustom}`;
const LinkStyled = styled(Link)`${Styles.linkTitle}`;
const ListProgressWrapper = styled.div`${Styles.progressWrapper}`;
const TextWrapper = styled('div')`${Styles.textWrapper}`;
const TitleStyled = styled(Title)`${Styles.title}`;
const TitleWrapper = styled.div`${Styles.titleWrapper}`;
const VideoProgressBarStyled = styled(VideoProgressBar)`${Styles.videoProgress}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * List Card
 * @param {!Object} props - Props for this component
 * @param {string} [props.articleType] - The type of article
 * @param {Object} [props.authors] - the authors for the story
 * @param {string} [props.advertisementBrand] - the advertisement brand
 * @param {array} [props.cardImages] - List of images
 * @param {string} [props.cardLabel] - the card label
 * @param {string} [props.className] - Class name modifier class
 * @param {string} [props.channelOrShowName] - When we have channel/show the name comes here
 * @param {string} [props.contentPriority] - content priority for this card
 * @param {string} [props.description] - card description
 * @param {string} [props.durationString] - the video duration
 * @param {string} [props.device] - page current device
 * @param {array} [props.hierarchy] - the hierarchy of the content
 * @param {string} [props.flavor] - flavor of the card
 * @param {Object} [props.image] - the card image
 * @param {bool} [props.isDark = false] - true if it is in dark mode
 * @param {bool} [props.listGrid = false] - true in grid list
 * @param {bool} [props.logo] - Content logo if the card is a promo channel
 * @param {string} [props.mcpid] - the video mcpid
 * @param {bool} [props.preventFollowClick] - Adds link but prevents following it
 * @param {number} [props.readTime] - the approximate reading time for article
 * @param {Object} [props.sharing] - the sharing options object
 * @param {number} [props.slideCount] - the total slides count of the slide show
 * @param {style} [props.style] - Modifier style
 * @param {Object} [props.theme] - the theme object
 * @param {string} [props.title] - the card title
 * @param {string} [props.type] -the card type
 * @param {string} [props.uri] - the card uri
 * @param {string} [props.uid] - the card uid
 * @param {string} [props.updateDate] - the latest update date of the content
 * @param {string} [props.videoType] - the type of video
 * @param {Object} [props.widgetContext] - the card widget context
 * @access public
 * @returns {JSX}
 */
const ListCard = (props) => {
  const {
    advertisementBrand,
    articleType,
    authors,
    cardImages,
    cardLabel,
    className,
    contentPriority,
    channelOrShowName,
    description,
    durationString,
    device,
    flavor,
    hideActionBar,
    hideText,
    hierarchy,
    image,
    isDark,
    isTextOnly,
    layout,
    listGrid,
    logo,
    mcpid,
    overlay,
    preventFollowClick,
    readTime,
    sharing,
    slideCount,
    style,
    theme,
    title,
    type,
    uid,
    uri,
    updateDate,
    vertical,
    videoType,
    widgetContext,
    isRelatedCollection,
    ...otherProps
  } = props;
  const isVerticalLayout = layout === VERTICAL;
  const cardType = getSquareCardContentType(type);
  const hasFlavor = !!flavor;
  const position = otherProps?.position || 0;
  /**
   * TO-DO: validation was placed so that this configuration only applies to the desktop
   * version, it would be necessary to check if this labelTheme validation is necessary,
   * since the tests fail because the Label that comes from ShareComponents contains
   * a value for the default color.
   */
  const labelTheme = {
    ...theme,
    isDark: (isDark && !hasFlavor),
    primary: widgetContext?.isWorldCupMVP && device === 'desktop' ? GREEN_DARKER : theme?.primary,
  };
  if (flavor === widgetFlavor.FLAVOR_PRENDE_TV) {
    labelTheme.isDark = isDark;
  }
  // Tracking values
  const trackingContent = {
    title,
    uid,
    uidContent: uid,
    position,
    destination_url: uri,
    ...(cardType?.isCrossVerticalPromo && {
      uid: uri,
      cardTypeOverride: 'external widget',
    }),
  };
  const trackClick = useCallback(
    CardTracker.onClickHandler(trackingContent, widgetContext, flavor === widgetFlavor.FLAVOR_PRENDE_TV ? 'prendetv_cta_external' : 'content'),
    [uid, title, widgetContext, flavor]
  );
  if (!isValidValue(type)) {
    return null;
  }
  const isVix = features.widgets.isVixEnabled();
  const labelType = videoType || type;
  const labelProps = getCardLabel({
    authors,
    articleType,
    cardLabel,
    contentPriority,
    hierarchy,
    channelOrShowName,
    uri,
    type: labelType,
    vertical,
  });
  const isRadio = cardType.isRadioStation;
  let backgroundColor = isDark ? BLACK_GREY : WHITE;
  if (theme?.backgroundColor && isVix) backgroundColor = theme.backgroundColor;
  const isWorldCupMVP = features.deportes.isWorldCupMVP();
  const ctIsValid = getValidationMVP(type);
  return (
    <Wrapper
      className={className}
      style={style}
      isDark={isDark}
      layout={layout}
      isTextOnly={isTextOnly}
      listGrid={listGrid}
      backgroundColor={backgroundColor}
    >
      {!isTextOnly && (
        <DynamicAspectRatio isVerticalLayout={isVerticalLayout}>
          <ListCardImage
            cardImages={cardImages}
            contentPriority={contentPriority}
            durationString={durationString}
            image={image}
            isDark={isDark}
            isRadio={isRadio}
            isSlideshow={cardType.isSlideshow}
            isVideo={cardType.isVideo}
            layout={layout}
            mcpid={mcpid}
            title={title}
            overlay={overlay}
            preventFollowClick={preventFollowClick}
            trackClick={trackClick}
            uid={uid}
            uri={uri}
            widgetContext={widgetContext}
            useExplicitNavigation={!cardType.isCrossVerticalPromo}
            target={cardType.isCrossVerticalPromo ? '_blank' : '_self'}
            {...otherProps}
          />
        </DynamicAspectRatio>
      )}
      {!hideText && (
        <TextWrapper layout={layout} isTextOnly={isTextOnly}>
          {!isTextOnly && !cardType.isSoccerMatch && (
            <Badge layout={layout}>
              <LabelLink href={labelProps?.href} theme={labelTheme}>
                {
                  (isWorldCupMVP && ctIsValid && device === 'mobile') ? (
                    <div>
                      <LabelMVP
                        {...labelProps}
                        isListItem
                        isVerticalLayout={isVerticalLayout}
                        theme={labelTheme}
                        device={device}
                      />
                    </div>
                  )
                    : (
                      <div>
                        <LabelCustom
                          {...labelProps}
                          isListItem
                          isVerticalLayout={isVerticalLayout}
                          theme={labelTheme}
                          isWorldCupMVP={isWorldCupMVP}
                        />
                      </div>
                    )
                }
              </LabelLink>
            </Badge>
          )}
          <TitleWrapper
            isCentered={cardType.isExternalPromo}
            layout={layout}
            isDark={isDark}
            isTextOnly={isTextOnly}
            isRadio={isRadio}
            isSoccerMatch={cardType.isSoccerMatch}
          >
            <TitleStyled
              ctIsValid={ctIsValid}
              layout={layout}
              isDark={isDark}
              isWorldCupMVP={isWorldCupMVP}
            >
              <LinkStyled
                className="uvs-font-b-bold"
                href={uri}
                onClick={trackClick}
                preventFollowClick={preventFollowClick}
                type={type}
                layout={layout}
                isTextOnly={isTextOnly}
                target={cardType.isCrossVerticalPromo ? '_blank' : '_self'}
                useExplicitNavigation={!cardType.isCrossVerticalPromo}
                isRelatedCollection={isRelatedCollection}
                isWorldCupMVP={isWorldCupMVP}
              >
                {title}
              </LinkStyled>
            </TitleStyled>
          </TitleWrapper>
          {(isTextOnly || isRadio) && (
            <Description layout={layout} isDark={isDark}>
              {stripTagsHtml(description)}
            </Description>
          )}
        </TextWrapper>
      )}
      <ListContent
        {...props}
        cardType={cardType}
        hasFlavor={hasFlavor}
        ctIsValid={ctIsValid}
        isWorldCupMVP={isWorldCupMVP}
        isVix={flavor === widgetFlavor.FLAVOR_PRENDE_TV}
      />

      {cardType.isVideo && !isVerticalLayout && (
        <ListProgressWrapper>
          <VideoProgressBarStyled
            mcpid={mcpid}
            strokeColor={SEA_BUCKTHORN}
            trailColor={GALLERY_GREY}
          />
        </ListProgressWrapper>
      )}
      {cardType.isSoccerMatch && !isVerticalLayout && (
        <SquareScoreCardConnector
          {...otherProps}
          cardLabel={cardLabel}
          device={device}
          updateDate={updateDate}
          isListCard
          isDark={isDark}
          widgetContext={widgetContext}
          title={title}
          description={description}
          uid={uid}
          uri={uri}
          trackClick={trackClick}
          image={image}
          theme={theme}
          isTextOnly={isTextOnly}
        />
      )}
    </Wrapper>
  );
};

ListCard.propTypes = {
  articleType: PropTypes.string,
  authors: PropTypes.array,
  advertisementBrand: PropTypes.string,
  cardImages: PropTypes.array,
  cardLabel: PropTypes.string,
  className: PropTypes.string,
  channelOrShowName: PropTypes.string,
  contentPriority: PropTypes.string,
  description: PropTypes.string,
  durationString: PropTypes.string,
  device: PropTypes.string,
  flavor: PropTypes.string,
  image: PropTypes.shape({
    credit: PropTypes.string,
    renditions: PropTypes.object,
  }),
  overlay: PropTypes.node,
  hideActionBar: PropTypes.bool,
  hierarchy: PropTypes.array,
  hideText: PropTypes.bool,
  isDark: PropTypes.bool,
  isTextOnly: PropTypes.bool,
  layout: PropTypes.oneOf([HORIZONTAL, VERTICAL]),
  listGrid: PropTypes.bool,
  logo: PropTypes.string,
  mcpid: PropTypes.string,
  preventFollowClick: PropTypes.bool,
  readTime: PropTypes.number,
  sharing: PropTypes.object,
  slideCount: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  theme: PropTypes.object,
  title: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
  uid: PropTypes.string,
  updateDate: PropTypes.string,
  videoType: PropTypes.string,
  vertical: PropTypes.string,
  widgetContext: PropTypes.object,
  isRelatedCollection: PropTypes.bool,
};
ListCard.defaultProps = {
  contentPriority: STANDARD,
  hideActionBar: false,
  isDark: false,
  isTextOnly: false,
  layout: HORIZONTAL,
};

export default ListCard;
