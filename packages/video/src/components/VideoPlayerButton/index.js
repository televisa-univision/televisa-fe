import React from 'react';
import PropTypes from 'prop-types';
import Button from '@univision/fe-components-base/dist/components/Button';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Styles from './VideoPlayerButton.scss';

/**
 * Button overlaying video title card
 * @param {Object} props component props
 * @returns {JSX}
 */
const VideoPlayerButton = ({ onClick }) => {
  return (
    <Button className={Styles.buttonContainer} onClick={onClick}>
      <div className={Styles.circle}>
        <Icon name="playnocircle" size="medium" variant="light" />
      </div>
    </Button>
  );
};

VideoPlayerButton.propTypes = {
  onClick: PropTypes.func,
};

export default VideoPlayerButton;
