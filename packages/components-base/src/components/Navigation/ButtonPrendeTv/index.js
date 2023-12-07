import React from 'react';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import prendeTvTheme from '@univision/fe-commons/dist/themes/prendetv';
import vixTheme from '@univision/fe-commons/dist/themes/vix';

import { WHITE } from '@univision/fe-utilities/styled/constants';
import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';

import features from '@univision/fe-commons/dist/config/features';
import ActionLink from '../../ActionLink';
import Styles from './ButtonPrendeTv.styles';

const IconWrapper = styled.div`
  ${Styles.iconWrapper}
`;
const StyledActionLink = styled(ActionLink)`
  ${Styles.actionLink}
`;

let buttonTheme = {
  direction: 'left',
  ...prendeTvTheme(),
};

/**
 * Click tracker
 */
const trackClick = () => {
  const utagData = {
    eventAction: 'topnav-header-prendetv',
  };
  NavigationTracker.track(NavigationTracker.events.click, utagData);
};

/**
 * Button PrendeTV component
 * @returns {JSX}
 */
const ButtonPrendeTv = () => {
  const isVix = features.widgets.isVixEnabled();
  const iconProps = {
    name: 'logoPrendeTv',
    fill: WHITE,
    size: 48,
  };
  if (isVix) {
    iconProps.name = 'vix';
    iconProps.viewBox = '0 0 89 34';
    buttonTheme = {
      direction: 'left',
      ...vixTheme(),
    };
  }
  return (
    <StyledActionLink
      theme={buttonTheme}
      target="_blank"
      onClick={trackClick}
      href="https://vix.smart.link/nf1l32vsc?site_id=univision&creative_id=evergreen&lpurl=https://vix.com/es/canales&cp_1=internal_referral&cp_2=0&cp_3=top_nav&cp_4=0"
    >
      <IconWrapper>
        <Icon {...iconProps} />
      </IconWrapper>
    </StyledActionLink>
  );
};

export default ButtonPrendeTv;
