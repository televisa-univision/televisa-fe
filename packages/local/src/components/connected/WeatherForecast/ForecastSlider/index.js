import React from 'react';
import Loadable from 'react-loadable';
import styled from 'styled-components';

import MobileStyle from './MobileSlider/MobileSlider.styles';
import DesktopStyle from './DesktopSlider/DesktopSlider.styles';

const MobileLoader = styled.div`${MobileStyle.wrapper}`;
const DesktopLoader = styled.div`${DesktopStyle.wrapper}`;

/**
 * Slider component for weather forecast
 * @param {string} device - users device
 * @returns {JSX}
 */
const Slider = (device) => {
  let SliderComponent;

  if (device === 'mobile') {
    SliderComponent = Loadable({
      loader: () => import(/* webpackChunkName: "component/[request]" */ './MobileSlider'),
      loading: () => <MobileLoader />,
    });
  } else {
    SliderComponent = Loadable({
      loader: () => import(/* webpackChunkName: "component/[request]" */ './DesktopSlider'),
      loading: () => <DesktopLoader />,
    });
  }

  return SliderComponent;
};

export default Slider;
