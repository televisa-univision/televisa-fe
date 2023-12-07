import styled from 'styled-components';
import {
  SLATE_GREY,
  GALLERY_GREY,
  ABSOLUTE_ZERO_BLUE,
} from '@univision/fe-utilities/styled/constants';
import { rem } from '@univision/fe-commons/dist/utils/styled/mixins';

export const SmartBannerWrapper = styled.div`
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  z-index: 9999;
`;

export const SmartBannerContainer = styled.div`
  align-items: center;
  background-color: ${GALLERY_GREY};
  display: flex;
  font-family: "Roboto", sans-serif;
  height: ${rem(90)};
  justify-content: space-between;
  padding: 8px 16px 8px 8px;
  transition: opacity 300ms ease-in-out;
  width: 100%;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  box-shadow: none;
  flex: 0 1 auto;
  margin-right: ${rem(8)};
  padding: ${rem(8)};
`;

export const BannerContent = styled.div`
  align-items: baseline;
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
`;

export const BannerContentTitle = styled.p`
  font-size: ${rem(14)};
  font-weight: normal;
  line-height: ${rem(20)};
  margin-bottom: 0;
`;

export const BannerContentPublisher = styled.p`
  color: ${SLATE_GREY};
  font-size: ${rem(12)};
  line-height: ${rem(20)};
  margin-bottom: 0;
`;

export const BannerContentTagline = styled.p`
  color: ${SLATE_GREY};
  font-size: ${rem(12)};
  line-height: ${rem(20)};
  margin-bottom: 0;
`;

export const CTAButton = styled.a`
  color: ${ABSOLUTE_ZERO_BLUE};
  font-size: ${rem(16)};
  line-height: ${rem(20)};
  text-decoration: none;
`;
