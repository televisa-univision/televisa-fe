import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidValue from '@univision/fe-utilities/helpers/common/isValidValue';
import Title from '@univision/fe-components-base/dist/components/Title';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import PRENDE_CTA_IMAGES from '@univision/fe-commons/dist/constants/prendeCTAImages';
import { getNodeId } from '@univision/fe-commons/dist/utils/video';
import VideoWithPlaylist from '@univision/fe-video/dist/components/widgets/VideoWithPlaylist/VideoWithPlaylistConnector';
import features from '@univision/fe-commons/dist/config/features';

import { isValidArray } from '@univision/fe-commons/dist/utils/helpers';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';

import slateImage from '../../../../assets/tudn/images/slate-pre-match.png';
import Styles from './SoccerMatchContent.styles';

const TitleStyled = styled(Title)`${Styles.headline}`;

const VIX_ON = 'ON';
const VIX_POST = 'POST';

/**
 * Check if should re-render the component based on props changes
 * @param {Object} prevProps - react previous props component
 * @param {Object} nextProps - react new props component
 * @returns {boolean}
 */
function areEqualProps(prevProps, nextProps) {
  return prevProps?.headline === nextProps?.headline
    && prevProps?.pageCategory === nextProps?.pageCategory
    && prevProps?.videoCuepoints?.length === nextProps?.videoCuepoints?.length
    && prevProps?.videoSettings === nextProps?.videoSettings;
}

/**
 * Soccer Match content to wrapper player and widgets
 * @public
 * @param {Object} props - component react props
 * @param {Object} props.id - id of content
 * @param {Object} props.channels - the network channels for the soccer match
 * @param {string} props.device - the current device on the page
 * @param {string} props.externalLink - Link to PrendCTA banner
 * @param {bool} props.featuredEvent - Has featured event
 * @param {string} props.headline - match title/headline
 * @param {string} props.pageCategory - match/page category depending of the match status game
 * @param {Object} props.playlist - video playlist
 * @param {Object} props.prendeSubtitle - prende CTA sub title
 * @param {Object} props.shortTitle - short title
 * @param {Object} props.theme - the current theme on the page
 * @param {Array} props.videoCuepoints - match highlights event for video cuepoints
 * @param {Object} props.videoSettings - settings for video widgets
 * @param {(Node[]|Element[])} props.widgets - page widgets ready to render
 * @param {number} props.widgetOffset - space offset between widgets
 * @param {Object} props.embedVixPlayer - settings for embed vix player
 * @returns {JSX}
 */
function SoccerMatchContent({
  id,
  channels,
  device,
  externalLink,
  featuredEvent,
  headline,
  language,
  pageCategory,
  playlist,
  prendeSubtitle,
  prendePlaylist,
  section,
  shortTitle,
  theme,
  videoCuepoints,
  videoSettings,
  widgetOffset,
  widgets,
  liveStreamEnabled,
  embedVixPlayer,
}) {
  const hasPrendeLink = isValidValue(externalLink);
  const showSlate = pageCategory === pageCategories.SOCCER_MATCH_PRE;
  const playlistHasVideos = isValidArray(playlist?.videos) || isValidArray(prendePlaylist);
  const { settings } = videoSettings || {};
  let showVideo = videoSettings?.showVideo;
  const prendeCTAProps = {
    device,
    featuredEvent,
    link: externalLink,
    shortTitle,
    subTitle: prendeSubtitle,
    id,
    imageConfig: PRENDE_CTA_IMAGES[section] || PRENDE_CTA_IMAGES.generic,
    isVixEnabled: features.widgets.isVixEnabled(),
    liveStreamEnabled,
  };

  if (hasPrendeLink) {
    // If we have an external link, and networks are properly set (prende/vix) enable the player
    const hasValidNetwork = ['prende', 'vix', 'vix-plus'].some(item => channels?.[language]?.includes(item));
    showVideo = showVideo || hasValidNetwork;

    if (pageCategory === pageCategories.SOCCER_MATCH_POST) {
      showVideo = playlistHasVideos;
    }
  }

  const isVixPlayer = isValidObject(embedVixPlayer);

  if (isVixPlayer) {
    // If exist vixPlayer enable the player when status is ON
    showVideo = showVideo || embedVixPlayer?.status === VIX_ON;
    if (embedVixPlayer?.status === VIX_POST) {
      showVideo = playlistHasVideos;
    }
  }

  if (!showVideo && global.window?.FMG?.trigger) {
    const nodeId = getNodeId(settings?.settings || {});
    global.window.FMG.trigger('Video.onPIPUpdate', null, { load: false }, nodeId);
  }

  return (
    <>
      {headline
        && (
          <TitleStyled
            size="regular"
            element="h1"
          >
            {headline}
          </TitleStyled>
        )
      }
      {showVideo && (
        <div id={settings.type} data-widget-offset={widgetOffset}>
          <div className="widget" data-widget-type={settings.type}>
            <VideoWithPlaylist
              {...videoSettings?.settings}
              channels={channels}
              cuepoints={videoCuepoints}
              device={device}
              slate={slateImage}
              showPrendeCTA={hasPrendeLink}
              prendeCTAProps={prendeCTAProps}
              prendePlaylist={prendePlaylist}
              showSlate={showSlate}
              theme={theme}
              pageCategory={pageCategory}
            />
          </div>
        </div>
      )}
      {widgets}
    </>
  );
}

SoccerMatchContent.propTypes = {
  id: PropTypes.number,
  channels: PropTypes.object,
  device: PropTypes.string,
  featuredEvent: PropTypes.bool,
  headline: PropTypes.string,
  pageCategory: PropTypes.string,
  prendeSubtitle: PropTypes.string,
  theme: PropTypes.object,
  language: PropTypes.string,
  videoCuepoints: PropTypes.arrayOf(PropTypes.object),
  videoSettings: PropTypes.shape({
    showVideo: PropTypes.bool,
    settings: PropTypes.object,
  }),
  widgets: PropTypes.arrayOf(PropTypes.element),
  widgetOffset: PropTypes.number,
  externalLink: PropTypes.string,
  playlist: PropTypes.object,
  prendePlaylist: PropTypes.arrayOf(PropTypes.object),
  section: PropTypes.string,
  shortTitle: PropTypes.string,
  liveStreamEnabled: PropTypes.bool,
  embedVixPlayer: PropTypes.object,
};

export default React.memo(SoccerMatchContent, areEqualProps);
export { areEqualProps };
