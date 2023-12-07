import { getKey, deburrToLowerCase, isValidArray } from '../../../helpers';
import Store from '../../../../store/store';
import Tracker from '../Tracker';

/**
 * Tracks video events
 */
class VideoTracker extends Tracker {
  /**
   * Sets the events for this tracker
   * @constructor
   */
  constructor() {
    super({
      anchorVideoClose: VideoTracker.trackAnchorVideoClose,
      anchorVideoCollapse: VideoTracker.trackAnchorVideoCollapse,
      anchorVideoExpand: VideoTracker.trackAnchorVideoExpand,
      playlistItemClick: VideoTracker.trackClickOnWidgetPlaylist,
      trackClickOnVideoWidgets: VideoTracker.trackClickOnVideoWidgets,
    });
    this.events = {
      ...this.events,
      pipSearchPlaceholder: VideoTracker.pipEvent('video_load_0_search_placeholder', this),
      pipDispatchMetadata: VideoTracker.pipEvent('video_load_1_dispatch_metadata', this),
      pipMediaPlayer: VideoTracker.pipEvent('video_load_2_media_player', this),
      pipFmgCall: VideoTracker.pipEvent('video_load_3_fmg_call', this),
      pipPositionVisible: VideoTracker.pipEvent('video_load_4_player_position_visible', this),
      pipPlaceholderVisible: VideoTracker.pipEvent('video_load_5_placeholder_visible', this),
      pipPositionAnchor: VideoTracker.pipEvent('video_position_anchor', this),
      pipSpaAnchor: VideoTracker.pipEvent('video_position_spa_nextpage', this),
      pipSpaErrors: VideoTracker.pipEvent('video_error', this),
    };
    this.eventIds = [];
  }

  /**
   * Tracks closing the anchor video
   * @param {Object} data extra tracking data
   */
  static trackAnchorVideoClose(data) {
    const eventData = {
      ...data,
      event: 'video_click_anchor_close',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks collapsing the anchor video
   */
  static trackAnchorVideoCollapse() {
    const eventData = {
      event: 'video_click_anchor_collapse',
      video_player_position: 'anchor-expanded',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks expanding the anchor video
   */
  static trackAnchorVideoExpand() {
    const eventData = {
      event: 'video_click_anchor_expand',
      video_player_position: 'anchor',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks clicks on the playlist of a widget.
   */
  static trackClickOnWidgetPlaylist() {
    const eventData = {
      event: 'related video',
      mas_video: 'click mas videos',
    };
    Tracker.fireEvent(eventData);
  }

  /**
   * Tracks scrolling milestones.
   * @param {Object} data Contextual data
   */
  static trackClickOnVideoWidgets(data) {
    const trackData = {
      event: getKey(data, 'trackEvent', ''),
      card_id: getKey(data, 'uid'),
      card_title: deburrToLowerCase(getKey(data, 'title')),
      card_type: 'legacy promo',
      content_id: getKey(data, 'widgetContext.id'),
      widget_title: deburrToLowerCase(getKey(data, 'widgetContext.name')),
      widget_type: getKey(data, 'widgetContext.type'),
      widget_pos: getKey(data, 'widgetContext.position', 0),
    };
    Tracker.fireEvent(trackData);
  }

  /**
   * Add Pip Track events
   * @param {string} event - PiP event Name
   * @param {{}} instance - VideoTracker Instance
   * @returns {function}
   */
  static pipEvent(event, instance) {
    return (data) => {
      const state = Store.getState();
      const { eventIds } = instance;
      const { placeholderId } = getKey(state, 'videoPip', {});
      const eventMeta = getKey(data, 'event_meta');

      /** delete previous video data if Store videoPip change of video */
      if (placeholderId && placeholderId !== eventMeta) eventIds.length = 0;

      const key = `${event}-${eventMeta}`;
      if (!eventIds.includes(key)) {
        const videoId = getKey(data, 'video_id');
        const eventData = {
          event,
          ...data,
          video_id: isValidArray(videoId) ? videoId[0]?.mcpId : videoId,
        };
        eventIds.push(key);
        Tracker.fireEvent(eventData);
      }
    };
  }
}

export default new VideoTracker();
