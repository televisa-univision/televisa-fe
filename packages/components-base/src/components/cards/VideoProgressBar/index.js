import React from 'react';
import PropTypes from 'prop-types';

import Features from '@univision/fe-commons/dist/config/features';

import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import { GREY_BLACK, GREEN } from '@univision/fe-commons/dist/utils/styled/constants';

import ProgressBar from '../../ProgressBar';

/**
 * Determines from local storage video history if a provided video mcp id has
 * been played by the user and then show a progress bar
 * @param {string} className the class style override
 * @param {string} mcpid id of the video to look for
 * @param {string} style to be applied to the progress bar
 * @param {string} strokeColor the override stroke color
 * @param {string} trailColor the override trail color
 * @returns {JSX}
 */
const VideoProgressBar = ({
  className,
  mcpid,
  strokeColor,
  trailColor,
}) => {
  // If mcpid is missing or  the feature to resume videos is disabled then don't show this bar
  if (!mcpid || !Features.video.enableResume()) return null;

  const currentVideoData = getKey(LocalStorage.getObject('videoHistory'), mcpid, {});
  const { currentTime, duration } = currentVideoData;

  // If the provided mcpid doesn't have any history then don't show anything
  if (!currentTime || !duration) return null;

  return (
    <ProgressBar
      className={className}
      percent={currentTime / duration * 100}
      strokeColor={strokeColor || GREEN}
      trailSize={4}
      trailColor={trailColor || GREY_BLACK}
    />
  );
};

VideoProgressBar.propTypes = {
  className: PropTypes.string,
  mcpid: PropTypes.string,
  strokeColor: PropTypes.string,
  trailColor: PropTypes.string,
};

export default VideoProgressBar;
