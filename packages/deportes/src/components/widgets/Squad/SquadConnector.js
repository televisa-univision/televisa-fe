import { connect } from 'react-redux';
import getSquad from '@univision/fe-commons/dist/store/actions/deportes/squad-actions';
import squadExtractor from '@univision/shared-components/dist/extractors/squadExtractor';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists } from '@univision/fe-commons/dist/utils/helpers';
import WithSelectiveAd from '../../utils/WithSelectiveAd';
import Squad from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  let roster = {};
  if (exists(settings.uid)) {
    const id = settings.uid;
    const widget = getWidgetById(state.page, id);
    if (widget) {
      roster = widget.extraData;
    }
  }
  return {
    roster,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return { getSquad: () => dispatch(getSquad(ownProps, squadExtractor)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithSelectiveAd(Squad));
