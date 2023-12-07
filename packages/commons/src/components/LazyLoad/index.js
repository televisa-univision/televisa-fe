import React from 'react';
import PropTypes from 'prop-types';
import VisibilitySensor from 'react-visibility-sensor';
import { ReactReduxContext } from 'react-redux';

import { fetchReactions } from '../../store/slices/reactions/reactions-slice';
import fetchContent from '../../utils/api/content/fetch';
import extractContentIds from '../../utils/helpers/extractContentIds';

import modes from './modes.json';

/**
 * Lazy load a component fetching data from web-api
 */
class LazyLoad extends React.Component {
  /**
   * Constructor
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      isVisible: false,
    };

    this.onVisible = this.onVisible.bind(this);
  }

  /**
   * Prefetch the data if eager mode is enabled
   */
  componentDidMount() {
    const { fetchMode } = this.props;

    if (fetchMode === modes.eager) {
      this.load();
    }
  }

  /**
   * Update the component when the data is loaded and the
   * component is visible
   * @param {Object} nextProps the next set of props
   * @param {Object} nextState the next state
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.isLoaded && nextState.isVisible;
  }

  /**
   * Triggered when the children visibility is changed
   * @param {boolean} isVisible Visibility state
   */
  onVisible(isVisible) {
    const { isLoaded } = this.state;

    if (isVisible) {
      this.setState({
        isVisible,
      });
      if (!isLoaded) {
        this.load();
      }
    }
  }

  /**
   * Updates the state with the data
   */
  async load() {
    if (global.window && !this.loading) {
      const {
        apiType,
        uri,
      } = this.props;
      this.loading = true;
      this.data = await fetchContent(uri, apiType);
      this.setState({
        isLoaded: true,
      });
      this.loading = false;
      const { store } = this.context;
      // Fetch reactions
      const contentIds = extractContentIds({
        data: [this.data?.widget],
        isWidget: true,
      });
      // TODO: refactor to move this to data collector on SSR
      if (store) {
        store.dispatch(
          fetchReactions({ contentIds })
        );
      }
    }
  }

  /**
   * Render the component.
   * @returns {XML}
   */
  render() {
    const {
      state: { isVisible },
      props: { children, placeholder, offset },
    } = this;

    return (
      <VisibilitySensor
        onChange={this.onVisible}
        offset={{ bottom: -Math.abs(offset) }}
        active={!isVisible}
        partialVisibility
        scrollCheck
        intervalCheck={false}
      >
        { isVisible ? children(this.data) : placeholder }
      </VisibilitySensor>
    );
  }
}

LazyLoad.propTypes = {
  children: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired,
  placeholder: PropTypes.node.isRequired,
  fetchMode: PropTypes.oneOf(Object.values(modes)),
  offset: PropTypes.number,
  apiType: PropTypes.oneOf(['content', 'widget']),
};

LazyLoad.defaultProps = {
  fetchMode: modes.lazy,
  offset: 100,
  apiType: 'content',
};

LazyLoad.contextType = ReactReduxContext;

export default LazyLoad;
