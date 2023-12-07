import styled from 'styled-components';
import { GREY_BLACK, WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import { media, rem } from '@univision/fe-commons/dist/utils/styled/mixins';
import Link from '@univision/fe-components-base/dist/components/Link';

export const AudioTitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-top: -8px;
  text-align: left;
  width: 100%;
  ${media.sm`
    margin-bottom: 16px;
    margin-top: 0;
  `}
`;

export const AudioTitle = styled.strong`
  font-size: ${rem('18px')};
  line-height: ${rem('26px')};
  overflow: hidden;
  white-space: normal;
  width: 263px;
  ${media.sm`
    font-size: ${rem('24px')};
    line-height: ${rem('29px')};
    width: calc(100% - 57px);
  `}
`;

export const AudioDetails = styled.div`
  font-size: ${rem('14px')};
  line-height: ${rem('18px')};
  margin-top: 16px;
  max-height: 90px;
  overflow-y: scroll;
  text-align: left;
  ${media.sm`
    font-size: ${rem('16px')};
    line-height: ${rem('20px')};
    margin-top: 24px;
    max-height: none;
    text-align: justify;
  `}
`;

export const AudioItem = styled.span`
  font-size: ${rem('12px')};
  line-height: ${rem('14px')};
  text-align: left;
`;

export const AudioButton = styled(Link)`
  align-items: center;
  color: ${WHITE};
  display: flex;
  font-size: ${rem('16px')};
  margin-top: 24px;

  svg {
    margin-right: 16px;
  }

  &:hover {
    color: ${GREY_BLACK};

    svg {
      path {
        fill: ${GREY_BLACK};
      }
    }
  }

  ${media.sm`
    margin-top: 40px;
  `}
`;
