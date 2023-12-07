import React from 'react';
import PropTypes from 'prop-types';
import Store from '@univision/fe-commons/dist/store/store';
import { setHeaderData } from '@univision/fe-commons/dist/store/actions/page-actions';
import { getVerticalNav } from './data/helpers';

/**
 * Async Header Storybook helper
 */
export default class NavDataProvider extends React.Component {
  /**
   * set initial state
   * @param {Object} props the props
   */
  constructor (props) {
    super(props);
    this.state = {};
    const { data, pageCategory } = props;
    getVerticalNav(data, pageCategory).then((navData) => {
      // Making navData available in store
      Store.dispatch(setHeaderData(navData));
      this.setState({ loaded: true });
    });
  }

  /**
   * render the desired component with state as props
   * @returns {JSX}
   */
  render () {
    const { render } = this.props;

    if (Object.keys(this.state).length === 0) return <div>Loading...</div>;

    if (!render || typeof render !== 'function') {
      return <p><code>Async</code> requires <code>props.render</code> to be a function!</p>;
    }

    return render();
  }
}

NavDataProvider.propTypes = {
  data: PropTypes.object.isRequired,
  pageCategory: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};
