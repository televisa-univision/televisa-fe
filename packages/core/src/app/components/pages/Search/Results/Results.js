import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Store from '@univision/fe-commons/dist/store/store';
import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';
import { exists, isValidArray, isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import ContentCard from '@univision/fe-components-base/dist/components/ContentCard';
import adHelper from '@univision/fe-commons/dist/utils/ads/adHelper';
import * as AdTypes from '@univision/fe-commons/dist/utils/ads/ad-types';

import config from '../config';
import Styles from './Results.scss';

/**
 * Detects if the advertising can be rendered after an element
 * @param {string} device Current user device
 * @param {number} idx Index of result item loaded
 * @returns {boolean}
 */
export const shouldRenderAd = (device, idx) => {
  const { settings } = config;
  return (
    device === 'mobile'
    && (idx === settings.firstAdPosition - 1
      || (exists(idx) && idx % (settings.adInterval + (settings.firstAdPosition - 1)) === 0))
  );
};

/**
 * Results component for Search
 * @param {Object} props component props
 * @returns {JSX}
 */
const Results = (props) => {
  const { results, loading } = props;
  const device = getDevice(Store);
  const showDesc = device === 'desktop';

  if (isValidArray(results)) {
    return (
      <div className={Styles.river}>
        <ul className={Styles.resultList}>
          {results.map((result, idx) => {
            if (!isValidObject(result)) {
              return null;
            }
            const item = (
              <li className={Styles.resultItem}>
                <ContentCard
                  primaryTag={result.primaryTag}
                  title={result.title}
                  type={result.type}
                  author={result.author}
                  view="horizontal"
                  showIcon
                  showDesc={showDesc}
                  titleElement="h2"
                  {...result}
                />
              </li>
            );
            return (
              <Fragment key={result.uid}>
                {item}
                {shouldRenderAd(device, idx) && (
                  <li className={classnames(Styles.ADResult, Styles.resultItem)}>
                    {adHelper.getAd(AdTypes.WIDGET_AD)}
                  </li>
                )}
              </Fragment>
            );
          })}
        </ul>
      </div>
    );
  }
  if (!loading) {
    return (
      <div className={Styles.emptyResults}>
        <h2 className={Styles.title}>{localization.get('searchNoResults')}</h2>
      </div>
    );
  }

  return null;
};

Results.propTypes = {
  results: PropTypes.array,
  loading: PropTypes.bool,
};

Results.defaultProps = {
  results: [],
};

export default Results;
