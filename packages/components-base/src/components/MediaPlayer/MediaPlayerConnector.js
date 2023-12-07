import { connect } from 'react-redux';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { closeRadio } from '@univision/fe-commons/dist/store/actions/player-actions';

import MediaPlayerContainer from './MediaPlayerContainer';

/**
 * Connector to be called when state change
 * @param {Object} state of mediaPlayer
 * @returns {{mediaPlayer: Object}}
 */
export const mapStateToProps = (state) => {
  return {
    mediaPlayer: state.player,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @returns {{closeRadio: Function}}
 */
export const mapDispatchToProps = {
  closeRadio,
};

/**
 * Check to mount only when page category change
 * ****** DO NOT DELETE ******
 * Without this break there will be infinite loops
 * because other components affecting the Store
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  return getKey(nextProps, 'mediaPlayer.anchorPlayer.stationTitle') === getKey(prevProps, 'mediaPlayer.anchorPlayer.stationTitle');
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: true,
    areStatePropsEqual,
  }
)(MediaPlayerContainer);
