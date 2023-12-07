/**
 * @module PrendeTV Live Channel
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import localization from '../../constants/localization';
import { PRENDE_TV_LANDING, PRENDE_TV_PARTNERS } from '../../constants';
import Styles from './LiveChannel.styles';
import { isLandingPage } from '../../utils';

const Wrapper = styled.div`${Styles.wrapper}`;
const InnerWrapper = styled.div`${Styles.innerWrapper}`;
const Image = styled.img`${Styles.image}`;
const Title = styled.h1`${Styles.title}`;
const Text = styled.h3`${Styles.text}`;
const Bullets = styled.ul`${Styles.bullets}`;
const BulletItem = styled.li`${Styles.bulletItem}`;
const PartnerWithUsText = styled.span`${Styles.partnerWithUsText}`;
const PartnerWithUs = styled.a`${Styles.link}`;

/**
 * Prende TV static LiveChannel.
 *
 * @param {Object} props - initial props of the component
 * @property {string} props.title - Live chanel component title
 * @property {string} props.text - Live chanel component text
 * @property {array} props.bullets - Live chanel component text
 * @property {Object} props.page - page container
 * @property {string} props.device - device detected
 * @returns {JSX}
 */
const LiveChannel = ({
  title,
  text,
  bullets,
  page,
  device,
}) => {
  const isMobile = device !== 'desktop';
  let pathImage = isMobile
    ? 'https://st1.uvnimg.com/74/c0/3a8aa9394440b70a0a1c56d54219/clever-final-mobile.png'
    : 'https://st1.uvnimg.com/34/0a/ca82e75b451ead2cbae0a246d77b/clever-final-desktop.png';

  if (!isLandingPage(page)) {
    pathImage = isMobile
      ? 'https://st1.uvnimg.com/00/3e/4b560466425e8cf0fbcceb471990/clever-partners-mobile.png'
      : 'https://st1.uvnimg.com/79/d6/cda679354ecfa9b03efb9cb191dc/clever-partners-desktop.png';
  }
  return (
    <Wrapper page={page}>
      <InnerWrapper>
        <Image src={pathImage} />
        <Title page={page}>{title}</Title>
        {text && <Text page={page}>{text}</Text>}
        {bullets && (
          <Bullets>
            {bullets.map(item => (
              <BulletItem key={`k${item}`}>{item}</BulletItem>
            ))}
          </Bullets>
        )}
        {!isLandingPage(page) && (
          <>
            <PartnerWithUsText>
              {localization.get('liveChannelPartnerWithUsButtonText')}
            </PartnerWithUsText>
            <PartnerWithUs href="mailto:partners@prende.tv">
              partners@prende.tv
            </PartnerWithUs>
          </>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

LiveChannel.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  bullets: PropTypes.array,
  page: PropTypes.oneOf([PRENDE_TV_LANDING, PRENDE_TV_PARTNERS]),
  device: PropTypes.string,
};
LiveChannel.defaultProps = {
  page: PRENDE_TV_LANDING,
};

export default LiveChannel;
