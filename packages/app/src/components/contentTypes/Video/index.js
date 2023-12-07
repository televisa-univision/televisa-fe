import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import { DARK_VARIANT, LIGHT_VARIANT } from '@univision/fe-commons/dist/utils/styled/constants';
import { LIST_WIDGET, DEPORTES_SCORE_CELLS } from '@univision/fe-commons/dist/constants/widgetTypes';

import WidgetsFactory from '../../../utils/factories/widgetsFactory';
import Styles from './VideoPage.styles';
import ConnectedGlobalWidget from '../../base/GlobalWidget';

const MobileBackground = styled.div`${Styles.mobileBackground}`;
const NewsLetterContainerVideo = styled.div`${Styles.newsLetterContainerVideo}`;
const VideoWrapper = styled.div`${Styles.videoWrapper}`;
const WidgetsContainer = styled.div`${Styles.widgetsContainer}`;
const ScorecellRow = styled.div`${Styles.rowScorecell}`;

/**
 * Container component representing a Video page
 * @param {Object} props React Props for this component
 * @returns {JSX}
 */
const Video = ({ pageData }) => {
  const { data, theme = {} } = pageData;
  const { isDark } = theme;
  const localProps = { ...data };
  const { adSettings: { disableVideoAds } = {} } = data;
  localProps.variant = isDark ? DARK_VARIANT : LIGHT_VARIANT;
  localProps.fullWidth = true;
  const WidgetsBelowContent = WithWidgets(null, [insertionPoints.belowContentBody]);
  const widgetsBlock = WidgetsBelowContent() && (
    <WidgetsBelowContent />
  );
  const userLocalizationMX = data.userLocation === 'MX';
  const widgetsFactory = new WidgetsFactory(pageData);
  const widgetRecirculation = widgetsFactory.getWidgetComponent(DEPORTES_SCORE_CELLS);
  return (
    <>
      <ConnectedGlobalWidget />
      {userLocalizationMX && widgetsFactory && widgetRecirculation && (
        <ScorecellRow>
          <div className="col-12">
            {widgetRecirculation}
          </div>
        </ScorecellRow>
      )}
      <VideoWrapper isDark={isDark}>
        <MobileBackground variant={localProps.variant} />
        <VideoPlayer
          {...localProps}
          disableVideoAds={disableVideoAds}
          widgetData={data}
        />
      </VideoWrapper>
      {widgetsBlock && (
        <WidgetsContainer className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-8">
              {widgetsBlock}
            </div>
          </div>
        </WidgetsContainer>
      )}
      {widgetsFactory && (
        <WidgetsContainer className="container">
          <div className="row">
            <div className="col-12">
              {widgetsFactory.getWidgetComponent(LIST_WIDGET)}
            </div>
          </div>
        </WidgetsContainer>
      )}
      <NewsLetterContainerVideo className="newsletterContainerVideo" isDark={isDark} />
    </>
  );
};

/**
 * propTypes
 * @property {Object} pageData - Page data from state api
 */
Video.propTypes = {
  pageData: PropTypes.shape({
    data: PropTypes.object,
    theme: PropTypes.object,
  }).isRequired,
};

export default Video;
