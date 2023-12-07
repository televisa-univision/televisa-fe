import { connect } from 'react-redux';
import getBrackets from '@univision/fe-commons/dist/store/actions/deportes/brackets-actions';
import bracketsExtractor from '@univision/shared-components/dist/extractors/bracketsExtractor';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import Brackets from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{standings: Object}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  let data = {};
  if (settings.uid) {
    const id = settings.uid;
    const widget = getWidgetById(state.page, id);
    if (widget) {
      data = widget.extraData;
    }
  }
  return {
    data,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBrackets:
        responseType => dispatch(getBrackets(ownProps, bracketsExtractor, responseType)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Brackets);
