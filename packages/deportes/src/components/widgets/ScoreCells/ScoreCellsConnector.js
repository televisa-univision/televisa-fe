import { connect } from 'react-redux';
import getScoreCells from '@univision/fe-commons/dist/store/actions/deportes/scoreCell-actions';
import { getWidgetById } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists, getKey, toRelativeUrl } from '@univision/fe-commons/dist/utils/helpers';
import { userLocationSelector } from '@univision/fe-commons/dist/store/selectors/page-selectors';
import scoreCellsExtractor from '@univision/shared-components/dist/extractors/scoreCellsExtractor';
import ScoreCells from '.';

/**
 * Connector to be called when state change
 * @param {Object} state of the page
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapStateToProps = (state, ownProps) => {
  const { settings } = ownProps;
  const uri = toRelativeUrl(getKey(state, 'page.data.uri', ''));
  const widget = exists(settings.uid) && getWidgetById(state.page, settings.uid);
  const data = getKey(widget, 'extraData', {});
  const homePageUri = [
    '/',
    '/deportes/uefa',
    '/deportes/futbol/uefa-champions-league',
    '/deportes/futbol/uefa-nations-league',
    '/deportes/futbol/uefa-europa-league',
    '/deportes/futbol/uefa-champions-league-qualifiers',
    '/deportes/futbol/uefa-supercup',
  ];
  const isHomePage = homePageUri.includes(uri);
  const userLocation = userLocationSelector(state);

  return {
    data,
    isHomePage,
    userLocation,
  };
};

/**
 * Object or function to be merged into component props
 * @param {Object} dispatch of redux
 * @param {Object} ownProps properties
 * @returns {{matches: Array}}
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return { getScoreCells: () => dispatch(getScoreCells(ownProps, scoreCellsExtractor)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreCells);
