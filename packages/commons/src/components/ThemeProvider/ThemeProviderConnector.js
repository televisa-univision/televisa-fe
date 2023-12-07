import { connect } from 'react-redux';
import { themeSelector } from '../../store/selectors/page-selectors';

import ThemeProvider from '.';

/**
 * Connector to subscribe on theme store changes
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{theme: Object}}
 */
const mapStateToProps = (state) => {
  return {
    theme: themeSelector(state),
  };
};

export default connect(mapStateToProps)(ThemeProvider);
