import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '@univision/fe-icons/dist/components/Icon';
import localization from '@univision/fe-utilities/localization/tudn';
import { BITTERSWEET, WHITE } from '@univision/fe-utilities/styled/constants';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import Styles from './PrendeCTA.styles';

const AspectRatioBox = styled.div`${Styles.aspectRatioBox}`;
const BottomContainer = styled.div`${Styles.bottomContainer}`;
const Container = styled.div`${Styles.container}`;
const Content = styled.div`${Styles.content}`;
const Divider = styled.div`${Styles.divider}`;
const FooterTitle = styled.span.attrs({ className: 'uvs-font-a-bold' })`${Styles.footerTitle}`;
const Image = styled.img`${Styles.championsIcon}`;
const ImageWrapper = styled.div`${Styles.imgWrapper}`;
const InnerAspectRatioBox = styled.div`${Styles.innerAspectRatioBox}`;
const PrendeCard = styled.a`${Styles.prendeCard}`;
const SubTitle = styled.p`${Styles.subTitle}`;
const TitleContainer = styled.div`${Styles.titleContainer}`;
const Title = styled.p`${Styles.title}`;
const TopContainer = styled.div`${Styles.topWrapper}`;

const CTA_ICON_PROPS = {
  prende: {
    fill: BITTERSWEET,
    height: 110,
    name: 'logoPrendeTv',
    viewBox: '0 50 256 165',
    width: 108,
  },
  vix: {
    fill: WHITE,
    name: 'vix',
    height: 110,
    width: 108,
    viewBox: '0 0 89 34',
  },
};

/**
 * Sport Loadable embedded widget
 * @param {Object} props The details for the widgets to load
 * @returns {JSX}
 */
const PrendeCTA = ({
  device,
  id,
  isVixEnabled,
  link,
  imageConfig,
  shortTitle,
  subTitle,
}) => {
  const isMobile = device === 'mobile';
  const titleLocale = isVixEnabled ? 'vixCTATitle' : 'prendeCTATitle';
  const iconProps = isVixEnabled ? CTA_ICON_PROPS.vix : CTA_ICON_PROPS.prende;

  /**
   * Tracking and redirect banner click
   */
  const prendeCardOnClick = useCallback(() => {
    const widgetPosisiton = 0;
    const titleEvent = isVixEnabled ? 'vix' : 'prende';

    Tracker.fireEvent({
      event: 'prendetv_cta_external_click',
      card_id: id,
      card_title: shortTitle,
      card_type: 'PrendeCard',
      widget_pos: widgetPosisiton,
      widget_title: `haz Click aqui para ver gratis por ${titleEvent}`,
      widget_type: `prende cta${widgetPosisiton}`,
      destination_url: link,
    });
  }, [id, shortTitle, link, isVixEnabled]);

  return (
    <Container>
      <PrendeCard href={link} onClick={prendeCardOnClick}>
        <AspectRatioBox>
          <InnerAspectRatioBox>
            <Content backgroundImage={imageConfig?.background}>
              <TopContainer>
                <ImageWrapper>
                  <Image src={imageConfig?.logo} />
                </ImageWrapper>
                <TitleContainer>
                  <Title>{localization.get(titleLocale)}:</Title>
                  {subTitle && <SubTitle>{isMobile ? shortTitle : subTitle}</SubTitle>}
                </TitleContainer>
              </TopContainer>
              <BottomContainer>
                <Divider />
                <FooterTitle>{localization.get('prendeCTAFooter')}</FooterTitle>
                <Icon {...iconProps} />
              </BottomContainer>
            </Content>
          </InnerAspectRatioBox>
        </AspectRatioBox>
      </PrendeCard>
    </Container>
  );
};
/**
 * propTypes
 * @property {bool} competition - the competition id
 */
PrendeCTA.propTypes = {
  device: PropTypes.string,
  id: PropTypes.number,
  isVixEnabled: PropTypes.bool,
  imageConfig: PropTypes.shape({
    background: PropTypes.string,
    thumbnail: PropTypes.string,
    logo: PropTypes.string,
  }),
  link: PropTypes.string,
  shortTitle: PropTypes.string,
  subTitle: PropTypes.string,
};

export default PrendeCTA;
