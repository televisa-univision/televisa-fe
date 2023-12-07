import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import Features from '@univision/fe-commons/dist/config/features';

import Video from '../../Video';
import LivestreamPlayerWrapper from '../LivestreamPlayerWrapper';
import SoccerPlayerWrapper from '../SoccerPlayerWrapper';
import NeulionPlayerWrapper from '../NeulionPlayerWrapper';

/**
 * VideoPlaylistPlayerWrapper
 * @param {Object} props the components content
 */
class VideoPlaylistPlayerWrapper extends React.Component {
  /**
   * setup state and bind methods
   * @param  {Object} props component props
   */
  constructor(props) {
    super(props);
    this.isSoccerPlaylist = hasKey(props, 'settings.soccerMatch')
      || hasKey(props, 'settings.isBroadcastStream');
    this.isLivestreamPlaylist = hasKey(props, 'settings.livestream');
    this.isPrendePlaylist = props?.showPrendeCTA;
    this.node = React.createRef();
    this.video = React.createRef();
  }

  /**
   * Render view
   * @returns {JSX}
   */
  render() {
    const {
      mcpid,
      playlistItem,
      channels,
      settings,
    } = this.props;

    let videoBlock = (
      <Video
        {...this.props}
        ref={this.video}
        playlistItem={playlistItem}
        fmgCall={{
          name: 'playlist',
          options: {
            asyncMeta: true,
            mcpIds: mcpid,
          },
        }}
      />
    );

    // eslint-disable-next-line react/prop-types
    if (this.isLivestreamPlaylist && !this.isPrendePlaylist && !settings?.isBroadcastStream) {
      if (Features.video.useNeulionLivestream()) {
        videoBlock = (
          <NeulionPlayerWrapper
            {...this.props}
            ref={this.node}
            showFreePopup
          />
        );
      } else {
        videoBlock = (
          <LivestreamPlayerWrapper
            {...this.props}
            ref={this.node}
            showFreePopup
            channels={channels}
          />
        );
      }
    } else if (this.isSoccerPlaylist && !this.isPrendePlaylist) {
      videoBlock = (
        <SoccerPlayerWrapper
          {...this.props}
          ref={this.node}
          channels={channels}
          showFreePopup
        />
      );
    }

    return (
      <Fragment>
        {videoBlock}
      </Fragment>
    );
  }
}

VideoPlaylistPlayerWrapper.propTypes = {
  channels: PropTypes.object,
  cuepoints: PropTypes.arrayOf(PropTypes.object),
  language: PropTypes.string,
  mcpid: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  multitab: PropTypes.bool,
  nodeId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  playlistItem: PropTypes.number,
  settings: PropTypes.shape({
    livestream: PropTypes.object,
    soccerMatch: PropTypes.object,
  }),
  showPrendeCTA: PropTypes.bool,
};

export default VideoPlaylistPlayerWrapper;
