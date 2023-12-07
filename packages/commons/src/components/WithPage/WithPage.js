import { connect } from 'react-redux';
import { pageSelector } from '../../store/selectors/page-selectors';
import { getKey } from '../../utils/helpers';

/**
 * Check to mount only when page uri changes.
 * @param {Object} nextProps to be applied
 * @param {Object} prevProps to be applied
 * @returns {boolean}
 */
export const areStatePropsEqual = (nextProps, prevProps) => {
  return getKey(prevProps, 'page.data.uri') === getKey(nextProps, 'page.data.uri');
};

/**
 * HOC to subscribe a component to the redux page object prop, usually just for the main wrapper
 * @param {Object} WrappedComponent component to be connected to the page prop in the redux state
 * @returns {React.Component}
 */
export default function WithPage(WrappedComponent) {
  /**
   * Connect to page state properties
   * @param {Object} state redux state
   * @returns {Object}
   */
  const mapStateToProps = state => ({
    page: pageSelector(state),
  });

  return connect(
    mapStateToProps,
    null,
    null,
    {
      areStatePropsEqual,
    }
  )(WrappedComponent);
}
