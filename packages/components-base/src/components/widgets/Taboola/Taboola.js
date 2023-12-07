/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import taboolaScriptLoader from '@univision/fe-commons/dist/utils/ads/vendors/taboolaLoader';
import styled from 'styled-components';
import Styles from './Taboola.styles';

const Container = styled.div`${Styles.container}`;

/**
 * Wrapper for the events of  Taboola
 * @param {Object} props react props
 * @returns {void}
 */
const taboolaSetupEvent = ({
  id,
  mode,
  placement,
  pageType,
  uri,
  isFeed,
}) => {
  const container = isFeed ? id : 'taboola-mid-article-1x1-1';
  if (_taboola.length === 0) _taboola.push({ [pageType]: 'auto', url: uri });
  else _taboola.splice(-1);
  _taboola.push({
    mode,
    container,
    placement,
    target_type: 'mix',
  });
  _taboola.push({ flush: true });
};

/**
 * Wrapper to Taboola component
 * @param {Object} props react props
 * @returns {JSX}
 */
const Taboola = ({
  mode, placement, pageType, uri, isFeed, articleDepth,
}) => {
  const id = `taboola-${placement.replace(/\s+/g, '-').toLowerCase()}-${articleDepth}`;
  useEffect(() => {
    taboolaScriptLoader();
    taboolaSetupEvent({
      id,
      mode,
      placement,
      pageType,
      uri,
      isFeed,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container id={id} />
  );
};

Taboola.propTypes = {
  mode: PropTypes.string,
  placement: PropTypes.string,
  pageType: PropTypes.string,
  uri: PropTypes.string,
  isFeed: PropTypes.bool,
  articleDepth: PropTypes.number,
};

// Possible values for mode: thumbnails-a, thumbnails-rr
Taboola.defaultProps = {
  mode: 'thumbnails-a',
  placement: 'unknown',
  pageType: '',
  uri: '',
  isFeed: false,
  articleDepth: 1,
};

export default Taboola;
