import styled from 'styled-components';

import {
  FACEBOOK_BACKGROUND, TWITTER_BACKGROUND, WHATSAPP_BACKGROUND, WHITE, ZINDEX_ABOVE_NAVIGATION,
} from '@univision/fe-commons/dist/utils/styled/constants';

export const socialNetworks = {
  facebook: FACEBOOK_BACKGROUND,
  twitter: TWITTER_BACKGROUND,
  whatsapp: WHATSAPP_BACKGROUND,
};

export const ShareBar = styled.div`
  align-items: center;
  background: black;
  bottom: 0;
  box-shadow: 0 -2px 2px 0 rgba(0, 0, 0, 0.2);
  color: ${WHITE};
  display: flex;
  height: 44px;
  justify-content: space-between;
  left: 0;
  position: fixed;
  width: 100%;
  z-index: ${ZINDEX_ABOVE_NAVIGATION};
`;

export const ShareLink = styled.a`
  align-items: center;
  background: ${(props) => {
    // eslint-disable-next-line max-len
    return props.theme?.ampShareLinkBackgroundColor ? props.theme?.ampShareLinkBackgroundColor : socialNetworks[props.socialNetwork];
  }};
  display: flex;
  flex-grow: 1;
  height: 45px;
  justify-content: center;
`;
