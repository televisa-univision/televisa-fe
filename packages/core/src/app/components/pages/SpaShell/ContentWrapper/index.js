import { Component } from 'react';
import PropTypes from 'prop-types';
import * as contentTypes from '@univision/fe-commons/dist/constants/contentTypes.json';
import { getPageComponent, mapPageTypeToBundleName } from '../../../../utils/factories/pageFactory';

/**
 * SPA content wrapper.
 */
class ContentWrapper extends Component {
  /**
   * Constructor
   * @constructor
   * @param {Object} props Component props.
   */
  constructor(props) {
    super(props);
    this.initialComponent = props.initialComponent;
  }

  /**
   * Re-render only if we have loaded a new content or error.
   * @param {Object} nextProps New properties.
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps) {
    const {
      data: {
        uri: oldUri,
      },
      error: oldError,
      pageCategory: oldPageCategory,
    } = this.props;

    const {
      data: {
        uri: newUri,
      },
      error: newError,
      pageCategory: newPageCategory,
    } = nextProps;

    return oldUri !== newUri || oldError !== newError || oldPageCategory !== newPageCategory;
  }

  /**
   * Render Page Component
   * @returns {JSX}
   */
  render() {
    let pageComponent;
    if (this.initialComponent) {
      pageComponent = this.initialComponent;
      this.initialComponent = null;
    } else {
      const { data, error } = this.props;
      const currentPageType = error
        ? contentTypes.ERROR_PAGE
        : mapPageTypeToBundleName(data, data.uri);
      pageComponent = getPageComponent(currentPageType);
    }

    return pageComponent;
  }
}

ContentWrapper.propTypes = {
  initialComponent: PropTypes.element,
  data: PropTypes.object,
  error: PropTypes.object,
  pageCategory: PropTypes.string,
};

export default ContentWrapper;
