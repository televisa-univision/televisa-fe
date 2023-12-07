import React from 'react';
import PropTypes from 'prop-types';

import Styles from './Placeholder.scss';

/**
 * Placeholder that simulates PlaylistItem
 * @param {Object} props component props
 * @returns {JSX}
 */
const PlaylistPlaceholder = ({ playlistView }) => {
  return (
    <div className={`${Styles.item} ${Styles[playlistView]}`}>
      <div className={Styles.thumbnail}>
        <span className={Styles.img} />
      </div>
      <div className={Styles.title}>
        <div className={Styles.line} />
        <div className={Styles.line} />
        <div className={Styles.line} />
        <div className={Styles.line} />
      </div>
    </div>
  );
};

PlaylistPlaceholder.propTypes = {
  playlistView: PropTypes.string,
};

export default PlaylistPlaceholder;
