import React from 'react';
import PropTypes from 'prop-types';
import { getPageData, getPageCategory } from '@univision/fe-commons/dist/store/storeHelpers';
import Header from '@univision/fe-components-base/dist/components/Header';
import Store from '@univision/fe-commons/dist/store/store';
import StationLaunch from '../../compound/StationLaunch/StationLaunch';
import RadioShowSlider from '../../compound/sliders/RadioShowSlider/RadioShowSlider';
import { getRadioStationProps } from '../../../utils/helpers';

import Styles from './RadioShow.scss';

/**
 * RadioShow Widget
 * @param {Object} props component props;
 * @returns {JSX}
 */
const RadioShow = ({
  content,
  settings,
  theme,
  device,
}) => {
  return (
    <div className={Styles.container}>
      <Header pageData={getPageData(Store).page} pageCategory={getPageCategory(Store)} />
      <div className={Styles.launcherWrap}>
        <div className={Styles.launcher}>
          <StationLaunch
            className={Styles.launch}
            theme={theme}
            {...getRadioStationProps(settings.radioStation)}
          />
        </div>
      </div>
      <RadioShowSlider content={content} device={device} />
    </div>
  );
};

RadioShow.propTypes = {
  content: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  theme: PropTypes.object,
  device: PropTypes.string,
};

export default RadioShow;
