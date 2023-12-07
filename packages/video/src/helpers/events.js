import { doIfPlayerExists } from '@univision/fe-commons/dist/utils/video';
import VideoTracker from '@univision/fe-commons/dist/utils/tracking/tealium/video/VideoTracker';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';
import { PRENDETV_PROMO } from '@univision/fe-commons/dist/constants/urls';

import { lockUnlockBody } from '.';

/**
 * Helper to close anchor
 * @param {number} nodeId - id player
 * @returns {function}
 */
export const handleCloseAnchor = nodeId => (expanded) => {
  lockUnlockBody(false);
  doIfPlayerExists(nodeId, (player) => {
    const { FMG } = window;
    const analyticsData = FMG?.getAnalyticsData(player.id);
    player.pause();
    VideoTracker.track(VideoTracker.events.anchorVideoClose, {
      video_player_position: expanded ? 'anchor-expanded' : 'anchor',
      ...analyticsData,
    });
  });
};

/**
 * Helper to handle expanded button click
 * @param {bool} expanded - expanded state behavior
 */
export const handleExpandedClick = (expanded) => {
  VideoTracker.track(
    expanded
      ? VideoTracker.events.anchorVideoExpand
      : VideoTracker.events.anchorVideoCollapse
  );
};

/**
 * Append new videos to jwplayer playlist
 * @param {Object[]} videos - new videso to append
 * @param {Object} options - extra options
 * @param {string} nodeId - current player id
 */
export const appendVideos = (videos, options, nodeId) => {
  doIfPlayerExists(nodeId, () => {
    const { FMG } = window;
    FMG.trigger('appendVideos', null, { videos, ...options }, nodeId);
  });
};

/**
 * Tracks anchor contents click
 * @param {Object} item current playlist item
 * @returns {Function}
 */
export const anchorTracking = item => () => {
  const { title, uid, url } = item || {};

  WidgetTracker.track(WidgetTracker.events.click, {
    widgetContext: {
      type: 'anchor_expanded',
      title: `anchor - ${title}`,
    },
    target: 'prendetv_cta_external',
    contentTitle: title,
    contentUid: uid,
    extraData: {
      destination_url: PRENDETV_PROMO,
    },
    eventLabel: 'Video_Playlist_Banner',
  });

  if (url) {
    window.open(url);
  }
};
