import React from 'react';
import PropTypes from 'prop-types';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Loading from '@univision/fe-components-base/dist/components/Loading';

import Placeholder from '../../Placeholder';

import Styles from './PlaylistPlaceholder.scss';

const ITEMS = [1, 2, 3, 4, 5];

/**
 * Placeholder component
 * @returns {JSX}
 */
const PlaylistPlaceholder = ({ theme, maxHeight, playlistView }) => {
  return (
    <div className={Styles.loading} style={{ maxHeight }}>
      <div className={Styles.loader}>
        <Loading
          label={`${localization.get('loadingPlaylist')}...`}
          theme={theme}
          className={Styles.loader}
        />
      </div>
      <div className={Styles.placeholders}>
        {ITEMS.map(i => (
          <Placeholder key={i} playlistView={playlistView} />
        ))}
      </div>
    </div>
  );
};

PlaylistPlaceholder.propTypes = {
  maxHeight: PropTypes.number,
  playlistView: PropTypes.string,
  theme: PropTypes.object,
};

PlaylistPlaceholder.defaultProps = {
  theme: {},
};

export default PlaylistPlaceholder;
