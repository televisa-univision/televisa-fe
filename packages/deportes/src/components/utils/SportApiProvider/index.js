import React from 'react';
import PropTypes from 'prop-types';

import { exists } from '@univision/fe-commons/dist/utils/helpers';
import ErrorBoundary from '@univision/fe-commons/dist/components/ErrorBoundary';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import { themes } from '@univision/fe-commons/dist/utils/themes/themes.json';
import Loading from '@univision/fe-components-base/dist/components/Loading';
import ApiError from '../../base/ApiError';

/**
 * Provides API conection for other components
 */
class SportApiProvider extends React.Component {
  /**
   * Fallback callback for errorBoundary
   * @returns {Object}
   */
  static errorFallback() {
    return null;
  }

  /**
   * set initial state
   * @param {Object} props the props
   */
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      response: {},
    };
    if (props.refreshRate !== 0) {
      this.timer = setInterval(() => this.fetchApi(), props.refreshRate * 1000);
    }
  }

  /**
   * Hook after component mount
   */
  componentDidMount() {
    this.fetchApi();
  }

  /**
   * Hook to allow the refresh timer to stop
   */
  componentDidUpdate() {
    const { stopRefresh } = this.props;
    if (this.timer && stopRefresh) {
      clearInterval(this.timer);
    }
  }

  /**
   * Component will unmount method
   */
  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /**
   * Api fetch executer
   */
  fetchApi() {
    const { cached, path } = this.props;
    let headers = null;
    if (!cached) {
      headers = { cache: 'no-store' };
    }
    fetchSportApi(path, headers).then(
      (response) => {
        if (exists(response.status) && response.status > '400') {
          this.setState({ error: true });
        } else {
          this.setState({ response });
        }
      },
      () => {
        this.setState({ error: true });
      }
    );
  }

  /**
   * render the desired component with state as props
   * @returns {JSX} - the component
   */
  render() {
    const {
      props: { errorComponent, render },
      state: { error, response },
    } = this;

    if (error) {
      return errorComponent;
    }
    if (!render || typeof render !== 'function') {
      return (
        <p>
          <code>Async</code>
          {' '}
requires
          <code>props.render</code>
          {' '}
to be a function!
        </p>
      );
    }
    if (Object.keys(response).length === 0) {
      return <Loading size="medium" theme={themes.sports} />;
    }
    return (
      <ErrorBoundary fallbackRender={SportApiProvider.errorFallback}>
        {render({ ...response })}
      </ErrorBoundary>
    );
  }
}

/**
 * @property {string} path to request api
 * @property {Object} render function after api response
 * @property {bool} cached to use browser cache or not
 * @property {Object} errorComponent component to be render if error happens while calling api
 * @property {number} refreshRate to call the api multiple times
 * @property {bool} stopRefresh to stop api calls
 */
SportApiProvider.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  cached: PropTypes.bool,
  errorComponent: PropTypes.object,
  refreshRate: PropTypes.number,
  stopRefresh: PropTypes.bool,
};

SportApiProvider.defaultProps = {
  cached: true,
  refreshRate: 0,
  errorComponent: <ApiError />,
  stopRefresh: false,
};

export default SportApiProvider;
