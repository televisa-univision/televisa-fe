import { connect } from 'react-redux';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';
import { UP } from '@univision/fe-commons/dist/constants/direction';

import Progress from './Progress';

/**
 * Connector to map scrollDirection to Progress component
 * @param {Object} state of the app
 * @returns {Object}
 */
const mapStateToProps = state => ({
  scrollDirection: getKey(state, 'headerConf.scrollDirection', UP),
});

export default connect(mapStateToProps)(Progress);
