/**
 * @module PrendeTV Opening Partners
 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import {
  PRENDE_TV_BETA,
  PRENDE_TV_LANDING,
  PRENDE_TV_PARTNERS,
} from '../../../constants';
import Styles from '../Opening.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const ImageWrapper = styled.div`${Styles.innerWrapper}`;
const Image = styled.img`${Styles.image}`;

/**
 * Prende TV static opening for business.
 *
 * @param {Object} props - initial props of the component
 * @property {string} props.device - device detected
 * @property {Object} props.page - page container
 * @returns {JSX}
 */
const Opening = ({ device, page }) => {
  const isMobile = device !== 'desktop';
  const pathImage = isMobile
    ? 'https://st1.uvnimg.com/d8/30/bac64b6b421a81be824a40d7375f/business-opening-mobile-4.jpg'
    : 'https://st1.uvnimg.com/88/60/c677485f4633840cb0e80c280b0c/business-opening-desktop-2.jpg';

  return (
    <Wrapper page={page}>
      <ImageWrapper className="col-lg-12">
        <Image src={pathImage} page={page} />
      </ImageWrapper>
    </Wrapper>
  );
};

Opening.propTypes = {
  device: PropTypes.string,
  page: PropTypes.oneOf([
    PRENDE_TV_BETA,
    PRENDE_TV_LANDING,
    PRENDE_TV_PARTNERS,
  ]),
};

Opening.defaultProps = {
  page: PRENDE_TV_LANDING,
};

export default Opening;
