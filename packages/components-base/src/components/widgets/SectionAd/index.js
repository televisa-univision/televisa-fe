import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as ActionAds from '@univision/fe-commons/dist/store/actions/ads-actions';
import {
  isTopAdOnListInsertedSelector,
  topAdInsertedFromSelector,
  topAdWidgetIdSelector,
} from '@univision/fe-commons/dist/store/selectors/ads-selectors';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import FullWidth from '../../FullWidth';

/**
 * Section Ad widget
 * @returns {JSX} a full width ad.
 */
const SectionAd = ({
  insertTopAd,
  isTopAdInserted,
  removeTopAd,
  settings,
  topAdWidgetId,
  widgetContext,
}) => {
  const [isTopAdRendered, setIsTopAdRendered] = useState(false);
  const { slotId, displayRules } = settings;
  const widgetId = widgetContext.id || widgetContext.position;

  useEffect(() => {
    if (!isTopAdInserted) {
      insertTopAd(widgetId);
      setIsTopAdRendered(true);
    }

    return () => {
      setIsTopAdRendered(false);
      removeTopAd();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const isTopAdWithSameId = topAdWidgetId === widgetId && isTopAdRendered;
  // default ad type for top ad and subsequent ads
  const type = !isTopAdWithSameId ? AdTypes.MID_AD_NO_FLEX : AdTypes.TOP_AD_SECTIONS;

  // implement custom ad size rules to change ad type on the fly
  const adType = adHelper.getAdTypeByDisplayRule({ index: slotId, type, displayRules });

  return (
    <>
      <div className="uvs-ad-full-width" id={`ad-${slotId}`}>
        <FullWidth breakpoints={['xxs', 'xs', 'sm']}>
          {adHelper.getAd(adType, { isLazyLoaded: !isTopAdWithSameId })}
        </FullWidth>
      </div>
    </>
  );
};

SectionAd.propTypes = {
  insertTopAd: PropTypes.func,
  isTopAdInserted: PropTypes.bool,
  removeTopAd: PropTypes.func,
  settings: PropTypes.object.isRequired,
  topAdWidgetId: PropTypes.string,
  widgetContext: PropTypes.object,
};

SectionAd.defaultProps = {
  widgetContext: {},
};

/**
 * Connector to be called when state change
 * @param {Object} state of the app
 * @returns {Object}
 */
const mapStateToProps = state => ({
  isTopAdInserted: isTopAdOnListInsertedSelector(state),
  topAdInsertedFrom: topAdInsertedFromSelector(state),
  topAdWidgetId: topAdWidgetIdSelector(state),
});

/**
 * map app state to local props
 * @param  {function} dispatch redux action
 * @returns {Object} the actions to inject to the component
 */
const mapDispatchToProps = dispatch => ({
  insertTopAd: id => dispatch(ActionAds.insertTopAd('SectionAd', id)),
  removeTopAd: () => dispatch(ActionAds.removeTopAd()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionAd);
