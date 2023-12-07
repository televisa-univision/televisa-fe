import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Store from '@univision/fe-commons/dist/store/store';
import { DARK_VARIANT } from '@univision/fe-utilities/styled/constants';
import LiveStream from '@univision/fe-video/dist/components/LiveStream';
import { LIVE_STREAM } from '@univision/fe-commons/dist/constants/contentTypes.json';
import { DIGITAL_CHANNEL_CARD } from '@univision/fe-commons/dist/constants/widgetTypes';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import features from '@univision/fe-commons/dist/config/features';
import { getKey, isValidValue } from '@univision/fe-commons/dist/utils/helpers';
import getRenditionUrl from '@univision/fe-commons/dist/utils/images/renditions';
import noticiasLiveLogo from '@univision/fe-commons/dist/assets/images/logo-noticias-live.svg';
import { getEPGSchedule, pauseAnyPlayerPlaying } from '@univision/fe-commons/dist/utils/video';
import { OPENING_CARD_RATIOS } from '@univision/fe-commons/dist/utils/images/ratios/openingCard';

import ActionBar from '../../ActionBar';
import Picture from '../../Picture';
import Link from '../../Link';
import Styles from './OpeningCard.styles';

const BarWrapper = styled.div`${Styles.barWrapper}`;
const Headline = styled.div`${Styles.headline}`;
const InfoWrapper = styled.div`${Styles.infoWrapper}`;
const LiveShow = styled.div`${Styles.liveShow}`;
const Logo = styled.img`${Styles.logo}`;
const ScheduleLink = styled(Link)`${Styles.schedule}`;
const Timestamp = styled.div.attrs({ className: 'uvs-font-c-regular' })`${Styles.timestamp}`;
const Title = styled.div.attrs({ className: 'uvs-font-b-bold' })`${Styles.title}`;
const VideoWrapper = styled.div`${Styles.videoWrapper}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Opening Card
 * @returns {JSX}
 */
const OpeningCard = ({ data }) => {
  const {
    active,
    auth,
    digitalChannelSchedule,
    image,
    title,
    type,
    uri,
    sharing,
    uid,
  } = data;

  /**
   * Social sharing click callback
   * @param {string} name - name of the social network
   */
  const onShareButtonClick = useCallback((name) => {
    SocialTracker.track(SocialTracker.events.share, {
      name,
      type: DIGITAL_CHANNEL_CARD,
      title,
      uid,
    });
    pauseAnyPlayerPlaying(null, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react/prop-types
  const sharingOptions = sharing && sharing.options;
  const activeProgram = getEPGSchedule(digitalChannelSchedule)?.currentShow;
  if (!isValidValue(activeProgram)) return null;

  const showLivestream = active && !auth && type === LIVE_STREAM;
  const hasActionBar = features.actionBar.hasActionBar(Store.getState());

  return (
    <Wrapper>
      <VideoWrapper>
        {showLivestream && (
          <LiveStream {...data} isActive={active} isAuth={auth} isNewsDigitalChannel />
        )}
        {!showLivestream && (
          <Link href={uri} title={title}>
            <Picture
              alt={title}
              image={image}
              overrideImageUrl={getRenditionUrl(
                getKey(image, 'image.renditions.original', {}),
                OPENING_CARD_RATIOS.mobile
              )}
            />
          </Link>
        )}
      </VideoWrapper>
      <InfoWrapper>
        <ScheduleLink href={uri}>
          <Headline>
            <Logo src={noticiasLiveLogo} />
          </Headline>
          {activeProgram ? (
            <LiveShow>
              <Timestamp>
                {activeProgram.startTimeDisplay} – {activeProgram.endTimeDisplay}
              </Timestamp>
              <Title isLiveTitle>{activeProgram.title}</Title>
            </LiveShow>
          ) : (
            <Title isLiveTitle>{title}</Title>
          )}
        </ScheduleLink>
        {hasActionBar && (
          <BarWrapper>
            <ActionBar
              contentId={uid}
              variant={DARK_VARIANT}
              sharingOptions={sharingOptions}
              onShareButtonClick={onShareButtonClick}
            />
          </BarWrapper>
        )}
      </InfoWrapper>
    </Wrapper>
  );
};

OpeningCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.shape({
    digitalChannelSchedule: PropTypes.array,
    image: PropTypes.object,
    mcpid: PropTypes.string,
    sharing: PropTypes.shape({
      options: PropTypes.any,
    }),
  })),
  device: PropTypes.string,
};

export default OpeningCard;
