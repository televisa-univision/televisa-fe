/**
 * @module PrendeTV Background
 */
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RichText from '@univision/fe-components-base/dist/components/RichText';
import { MOBILE } from '@univision/fe-commons/dist/constants/devices';

import PrendeTVContext from '../../../context';
import CTA from '../../CTA';
import Styles from './Background.styles';

const CtaButton = styled(CTA)`${Styles.ctaButton}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const SubHeadline = styled(RichText)`${Styles.subHeadline}`;
const Text = styled.h3`${Styles.text}`;
const Title = styled.h1`${Styles.title}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Prende TV Background with Headline promo card
 *
 * @param {Object} props - initial props of the component
 * @property {Object} props.callToAction - call to action
 * @property {Object} props.desktopBackground - background image for desktop
 * @property {string} props.headLine - title of the component
 * @property {Object} props.mobileBackground - background image for mobile
 * @property {boolean} props.opening - this is an opening background yes or no
 * @property {string} props.subHeadline - subtitle of the component
 * @property {string} props.text - subtitle below subHeadline of component
 * @returns {JSX}
 */
const Background = ({
  callToAction,
  desktopBackground,
  headLine,
  mobileBackground,
  opening,
  subHeadline,
  text,
}) => {
  const { device } = useContext(PrendeTVContext);

  return (
    <Wrapper
      background={device === MOBILE ? mobileBackground : desktopBackground}
      opening={opening}
    >
      <InnerWrapper>
        <Title>{headLine}</Title>

        {subHeadline && <SubHeadline html={subHeadline} />}
        {text && <Text>{text}</Text>}
        {callToAction && <CtaButton {...callToAction.link} />}
      </InnerWrapper>
    </Wrapper>
  );
};

Background.propTypes = {
  callToAction: PropTypes.object,
  desktopBackground: PropTypes.object,
  headLine: PropTypes.string,
  mobileBackground: PropTypes.object,
  opening: PropTypes.bool,
  subHeadline: PropTypes.string,
  text: PropTypes.string,
};

export default Background;
