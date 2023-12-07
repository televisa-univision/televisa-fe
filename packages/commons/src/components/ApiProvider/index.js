import React from 'react';
import PropTypes from 'prop-types';

import fetchApi from '../../utils/api/fetchApi';
import { hasKey } from '../../utils/helpers';
import setPageData from '../../store/actions/page-actions';

/**
 * Async storybook helper
 * to fetch content from syndicator API
 */
export default class ApiProvider extends React.Component {
  /**
   * set initial state
   * @param {Object} props the props
   */
  constructor(props) {
    super(props);
    this.state = {};
    fetchApi({
      url: props.url,
      env: props.env,
    }).then((response) => {
      // Making api available in store
      if (hasKey(props, 'store.dispatch')) {
        props.store.dispatch(setPageData({ data: response }));
      }
      this.setState(response);
    });
  }

  /**
   * render the desired component with state as props
   * @returns {JSX} - the component
   */
  render() {
    const { render } = this.props;

    if (Object.keys(this.state).length === 0) return <div>Loading...</div>;
    if (!render || typeof render !== 'function') {
      return (
        <p>
          <code>Async</code>
          {' requires'}
          <code>props.render</code>
          {' to be a function!'}
        </p>
      );
    }
    return render(this.state);
  }
}

ApiProvider.propTypes = {
  url: PropTypes.string.isRequired,
  env: PropTypes.oneOf(['production', 'performance', 'uat']),
  render: PropTypes.func.isRequired,
  store: PropTypes.object,
};
