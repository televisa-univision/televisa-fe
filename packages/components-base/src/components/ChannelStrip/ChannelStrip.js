import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import setCacheBuster from '@univision/fe-utilities/helpers/content/setCacheBuster';
import { PRENDETV_24_7, EPG_TUDN_US_URL, EPG_TUDN_MX_URL } from '@univision/fe-commons/dist/constants/urls';
import LiveStream from '@univision/fe-video/dist/components/LiveStream';
import { LIVE_STREAM, VIX_PLAYER } from '@univision/fe-commons/dist/constants/contentTypes.json';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import { truncateString } from '@univision/fe-commons/dist/utils/helpers';
import Icon from '@univision/fe-icons/dist/components/Icon';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { US } from '@univision/fe-commons/dist/constants/userLocation';

import { useSelector } from 'react-redux';
import Link from '../Link';
import Picture from '../Picture';
import PlayVideoButton from '../PlayVideoButton';

import Styles from './ChannelStrip.styles';

const Container = styled.div`
  ${Styles.channelStripContainer}
`;
const Thumbnail = styled.div`
  ${Styles.thumbnail}
`;
const ContentLink = styled(Link)`
  ${Styles.contentLink}
`;
const Title = styled.div`
  ${Styles.title}
`;
const ShortTitle = styled.span`
  ${Styles.shortTitleText}
`;
const LogoWrapper = styled.span`
  ${Styles.logoWrapper}
`;
const ActionButton = styled.div`
  ${Styles.actionButton}
`;
const ChannelMeta = styled.div`
  ${Styles.channelMeta}
`;
const ChannelContentWrapper = styled.div`
  ${Styles.channelContentWrapper}
`;
const PlayVideoButtonWrapper = styled(PlayVideoButton)`
  ${Styles.playVideoButtonWrapper}
`;

/**
 * ChannelStrip component.
 * @param {Object} props React Props for this component
 * @param {string} time Current show time
 * @param {string} title Current show title
 * @param {Object} widgetContext Current show title
 * @param {boolean} isShowLive Current show is live
 * @param {boolean} isTudn is TUDN site
 * @returns {JSX}
 * @constructor
 */
const ChannelStrip = ({
  data,
  title,
  widgetContext,
  isTudn,
}) => {
  const {
    active,
    uri,
    type,
    image,
    uid,
    url,
  } = data;
  const userLocation = useSelector(userLocationSelector);
  const isUS = userLocation === US;
  const urlPrendeTV = isTudn
    && (isUS ? EPG_TUDN_US_URL : EPG_TUDN_MX_URL)
    || `${PRENDETV_24_7}247_banner`;
  const showLivestream = active && type === LIVE_STREAM;
  const isVix = type === VIX_PLAYER;
  const widgetTracking = useCallback(() => WidgetTracker.track(WidgetTracker.events.click, {
    widgetContext,
    target: 'prendetv_cta_external',
    contentTitle: title,
    contentUid: uid,
    contentType: type,
    extraData: {
      destination_url: urlPrendeTV,
    },
    eventLabel: '24/7_Banner',
  }), [title, widgetContext, urlPrendeTV, type, uid]);

  if (!title) return null;

  return (
    <Container isTudn={isTudn}>
      <Thumbnail>
        {isVix && (
          <LazyLoad>
            <iframe
              width="100%"
              height="100%"
              title={title}
              frameBorder="0"
              allowFullScreen="true"
              allow="encrypted-media"
              src={setCacheBuster(`${url?.href}&smallPlayer=true`)}
            />
          </LazyLoad>
        )}

        {!isVix && showLivestream && (
          <LiveStream
            {...data}
            autoplay
            controls={false}
            disableFirstPreroll
            disableAnchor
            isActive={active}
            isAuth={false}
            isNewsDigitalChannel
            skipPause
            customNodeId={`channelstrip-${uid}`}
          />
        )}
        {!isVix && !showLivestream && (
          <Link href={uri} title={title} onClick={widgetTracking}>
            <Picture image={image} alt={title} />
          </Link>
        )}
      </Thumbnail>
      <ContentLink target="_blank" href={urlPrendeTV} onClick={widgetTracking}>
        <ChannelContentWrapper>
          <Title className="uvs-font-b-bold">
            <LogoWrapper isTudn={isTudn}>
              {
                isTudn
                  ? <Icon size="large" name="tudn" fill={WHITE} viewBox="3 10 95 6" />
                  : <Icon name="live247" viewBox="0 0 127 20" />
              }
            </LogoWrapper>
          </Title>
          <ChannelMeta>
            <ShortTitle className="uvs-font-b-bold">{truncateString(title, 34, '...', true, false)}</ShortTitle>
          </ChannelMeta>
        </ChannelContentWrapper>
        <ActionButton isTudn={isTudn}>
          <PlayVideoButtonWrapper label={localization.get('watchChannel')} />
        </ActionButton>
      </ContentLink>
    </Container>
  );
};

/**
 * propTypes
 * @property {String} image the thumbnail image to display
 * @property {String} uri URI of the logo link
 * @property {String} label the title of the livestream channel topic
 * @property {String} btnLabel the label for the strip CTA
 * @property {Number} mobileTrimLength number of chars to show before ellipsis on mobile breakpoints
 */
ChannelStrip.propTypes = {
  data: PropTypes.shape({
    active: PropTypes.bool,
    auth: PropTypes.bool,
    image: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    uri: PropTypes.string,
    uid: PropTypes.string,
    url: PropTypes.string,
  }),
  time: PropTypes.string,
  title: PropTypes.string,
  isShowLive: PropTypes.bool,
  widgetContext: PropTypes.object,
  isTudn: PropTypes.bool,
};

export default ChannelStrip;
