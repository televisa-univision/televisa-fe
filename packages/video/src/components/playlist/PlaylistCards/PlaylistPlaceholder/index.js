import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import Loading from '@univision/fe-components-base/dist/components/Loading';
import {
  HORIZONTAL,
  VERTICAL,
} from '@univision/fe-commons/dist/constants/layoutTypes';

import Placeholder from '../../../Placeholder';
import Styles from './PlaylistPlaceholder.styles';

const LoadingStyled = styled.div`${Styles.loading}`;

const ITEMS = [1, 2, 3, 4, 5];
const playlistViews = {
  [HORIZONTAL]: VERTICAL,
  [VERTICAL]: HORIZONTAL,
};

/**
 * Playlist cards placeholder component
 * @param {Object} props - react props for this component
 * @param {Object} props.theme - page theme definition
 * @param {number} props.maxHeight - placeholder list maximun height
 * @param {string} props.layout - card layout, horizontal or vertical
 * @param {boolean} props.isNewsDigitalChannel - if current page is news digital channel
 * @returns {JSX}
 */
function PlaylistPlaceholder({
  theme,
  maxHeight,
  layout,
  isNewsDigitalChannel,
}) {
  const labelText = `${localization.get('loadingPlaylist')}...`;
  const playlistView = playlistViews[layout];

  return (
    <LoadingStyled maxHeight={maxHeight} isNewsDigitalChannel={isNewsDigitalChannel}>
      <Loading
        label={labelText}
        theme={theme}
      />
      {ITEMS.map(item => (
        <Placeholder key={item} playlistView={playlistView} />
      ))}
    </LoadingStyled>
  );
}

PlaylistPlaceholder.propTypes = {
  maxHeight: PropTypes.number,
  layout: PropTypes.string,
  theme: PropTypes.object,
  isNewsDigitalChannel: PropTypes.bool,
};

PlaylistPlaceholder.defaultProps = {
  theme: {},
};

export default PlaylistPlaceholder;
