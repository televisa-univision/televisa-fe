import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import {
  getScrollTop,
  isInViewport,
  isValidArray,
} from '@univision/fe-commons/dist/utils/helpers';
import Store from '@univision/fe-commons/dist/store/store';
import { getTheme } from '@univision/fe-commons/dist/store/storeHelpers';
import { isLocalMarketSelector, deviceSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';

import features from '@univision/fe-commons/dist/config/features';
import ProgressBar from '../ProgressBar';

import Styles from './Progress.styles';

const ProgressWrapper = styled.div`${Styles.progressWrapper}`;

/**
 * Component
 * @param {Object} props Properties
 * @returns {JSX}
 */
class Progress extends React.Component {
  /**
   * Constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      showProgressBar: false,
    };
    this.progressLoader = React.createRef();
    this.hideHeaderFooter = features.header.hideHeaderFooter();
    this.device = deviceSelector(Store.getState());
    this.isLocal = isLocalMarketSelector(Store.getState());
  }

  /**
   * Add scroll event listener
   */
  componentDidMount () {
    window.addEventListener('scroll', this.onScrollHandler, { passive: false });
  }

  /**
   * Remove scroll event listener
   */
  componentWillUnmount () {
    window.removeEventListener('scroll', this.onScrollHandler);
  }

  /**
   * Validate the rules to show/hide the progress bar
   */
  onScrollHandler = () => {
    const { showProgressBar, progress } = this.state;

    const isMobile = this.device === 'mobile';
    let offset = this.isLocal ? 270 : 130;

    if (this.isLocal && !isMobile) {
      offset = 202;
    }

    if (this.progressLoader.current) {
      const scrollPos = getScrollTop();
      const shouldHideProgressBar = progress >= 99;

      if (showProgressBar && shouldHideProgressBar) {
        this.setState({ showProgressBar: false });
      }

      if ((!showProgressBar && !shouldHideProgressBar) || scrollPos < offset) {
        this.setState({
          showProgressBar: scrollPos > offset,
        });
      }

      this.setProgress();
    }
  }

  /**
   * Set state.progress to update the progress bar when a item is visible in viewport
   */
  setProgress = () => {
    const { loadedContents, items } = this.props;
    loadedContents.forEach((elem) => {
      const item = items.find((el) => {
        const id = el.getAttribute('data-content-loaded');
        return id === elem.uid;
      });
      if (item && isInViewport(item, window.innerHeight / 2)) {
        const rect = item.getBoundingClientRect();
        const { height, top } = rect;
        if (top < 0) {
          const offsetTop = Math.abs(top);
          const progress = (100 * offsetTop) / (height - window.innerHeight);
          this.setState({ progress });
        }
      }
    });
  }

  /**
   * Renders the contents list.
   * @returns {XML}
   */
  render() {
    const { loadedContents } = this.props;
    if (!isValidArray(loadedContents)) return null;
    const { progress, showProgressBar } = this.state;
    const progressBarProps = {
      percent: progress,
      strokeColor: getTheme(Store).secondary,
      trailSize: 4,
    };

    return (
      <ProgressWrapper
        showProgressBar={showProgressBar}
        isLocal={this.isLocal}
        ref={this.progressLoader}
      >
        <ProgressBar {...progressBarProps} />
      </ProgressWrapper>
    );
  }
}

Progress.propTypes = {
  loadedContents: PropTypes.array,
  items: PropTypes.array.isRequired,
};

export default Progress;
