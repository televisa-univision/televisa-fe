import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PlaylistPlaceholder from '@univision/fe-video/dist/components/playlist/ResponsivePlaylist/PlaylistPlaceholder';

import Styles from './VideoWithPlaylist.styles';

const Container = styled.div`
  ${Styles.container}
`;
const TitleContainer = styled.div`
  ${Styles.titleContainer}
`;
const TitleBar = styled.div`
  ${Styles.titleBar}
`;
const VideoPlaceholder = styled.div`
  ${Styles.videoPlaceholder}
`;

/**
 * VideoWithPlaylist Placeholder component for widgets
 * @param {Object} props Props object containing data
 * @param {Object} props.theme current page theme
 * @param {Object} props.showTitle we don't need title in places like video content type
 * @returns {JSX}
 * @constructor
 */
const VideoWithPlaylist = ({ theme, showTitle }) => {
  return (
    <Container>
      <div className="row">
        <div className="col-12">
          {
            showTitle && (
              <>
                <TitleBar />
                <TitleContainer />
              </>
            )
          }
          <div className="row">
            <div className="col-12 col-md-8 col-lg-8">
              <VideoPlaceholder />
            </div>
            <div className="col-12 col-xs-12 col-md-4 col-lg-4">
              <PlaylistPlaceholder theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

VideoWithPlaylist.propTypes = {
  theme: PropTypes.object,
  showTitle: PropTypes.bool,
};

VideoWithPlaylist.defaultProps = {
  theme: {},
  showTitle: true,
};

export default VideoWithPlaylist;
