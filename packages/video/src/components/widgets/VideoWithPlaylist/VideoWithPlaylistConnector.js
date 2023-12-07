/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';

import { userLocationSelector, pageDataSelector, languageSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import * as videoActions from '@univision/fe-commons/dist/store/actions/video-actions';
import features from '@univision/fe-commons/dist/config/features';
import VideoWithPlaylistLegacy from '@univision/fe-components-base/dist/components/widgets/VideoWithPlaylist';

import VideoWithPlaylist from '.';

/**
 * Wrapper for video playlist widget
 * @param {Object} props - compontent props enhancement
 * @returns {JSX}
 */
function VideoWithPlaylistWrapper({ ...props }) {
  return props?.hasEnhancement
    ? <VideoWithPlaylist {...props} /> : <VideoWithPlaylistLegacy {...props} />;
}

/**
 * Maps redux state to component props.
 * @param {Object} state redux state
 * @returns {Object}
 */
function mapStateToProps(state) {
  return {
    hasEnhancement: features.content.hasEnhancement(state),
    pageData: pageDataSelector(state),
    language: languageSelector(state),
    userLocation: userLocationSelector(state),
  };
}

/**
 * Check if shouldn't set new props if the data is equal or the previous
 * data is not a error
 * @param {Object} nextProps the new prop data
 * @param {Object} prevProps the previous prop data
 * @returns {boolean}
 */
function areStatePropsEqual(nextProps, prevProps) {
  return nextProps?.pageData?.uri === prevProps?.pageData?.uri
    && nextProps?.cuepoints?.length === prevProps?.cuepoints?.length
    && nextProps?.language === prevProps?.language;
}

/**
 * Add video dispatch action to component
 */
const mapDispatchToProps = {
  setPlaylistClicked: videoActions.setPlaylistClicked,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    areStatePropsEqual,
  }
)(VideoWithPlaylistWrapper);
