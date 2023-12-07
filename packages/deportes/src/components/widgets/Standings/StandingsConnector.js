import { connect } from 'react-redux';
import getStandings from '@univision/fe-commons/dist/store/actions/deportes/standings-actions';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import standingsExtractor from '@univision/shared-components/dist/extractors/standingsExtractor';
import Standings from '.';
import WithSelectiveAd from '../../utils/WithSelectiveAd';
import { AD_LAYOUT_RAIL_BOTTOM } from '../../utils/WithSelectiveAd/layouts';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  let standings = {};
  if (exists(settings.uid)) {
    const id = settings.uid;
    const widget = getWidgetById(state.page, id);
    if (widget) {
      standings = widget.extraData;
    }
  }
  return {
    standings,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return { getStandings: query => dispatch(getStandings(ownProps, standingsExtractor, query)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithSelectiveAd(Standings, AD_LAYOUT_RAIL_BOTTOM));
