/**
 * @module PrendeTV Product Link
 */
import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PrendeTVContext from '../../context';
import { PRODUCT_LINKS } from '../../constants';
import { setContentTracking } from '../../utils';

import Styles from './ProductLink.styles';

const Link = styled.a`${Styles.link}`;
const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * Component with product links
 * @param {boolean} vertical - display links as vertical list
 * @returns {JSX}
 */
const ProductLink = ({ vertical }) => {
  const { lang: language } = useContext(PrendeTVContext);

  return (
    <Wrapper vertical={vertical}>
      <Link
        force
        href={PRODUCT_LINKS.appstore.url}
        target={PRODUCT_LINKS.appstore.target}
        vertical={vertical}
        onClick={setContentTracking}
        data-app={PRODUCT_LINKS.appstore.key}
      >
        <img src={PRODUCT_LINKS.appstore.image[language]} alt={PRODUCT_LINKS.appstore.alt} />
      </Link>
      <Link
        force
        href={PRODUCT_LINKS.googleplay.url}
        target={PRODUCT_LINKS.googleplay.target}
        vertical={vertical}
        onClick={setContentTracking}
        data-app={PRODUCT_LINKS.googleplay.key}
      >
        <img src={PRODUCT_LINKS.googleplay.image[language]} alt={PRODUCT_LINKS.googleplay.alt} />
      </Link>
      <Link
        force
        href={PRODUCT_LINKS.firetv.url}
        target={PRODUCT_LINKS.firetv.target}
        vertical={vertical}
        onClick={setContentTracking}
        data-app={PRODUCT_LINKS.firetv.key}
      >
        <img src={PRODUCT_LINKS.firetv.image[language]} alt={PRODUCT_LINKS.firetv.alt} />
      </Link>
      <Link
        force
        href={PRODUCT_LINKS.roku.url}
        target={PRODUCT_LINKS.roku.target}
        vertical={vertical}
        onClick={setContentTracking}
        data-app={PRODUCT_LINKS.roku.key}
      >
        <img src={PRODUCT_LINKS.roku.image.en} alt={PRODUCT_LINKS.roku.alt} />
      </Link>
    </Wrapper>
  );
};

ProductLink.propTypes = {
  vertical: PropTypes.bool,
};

ProductLink.defaultProps = {
  vertical: false,
};

export default ProductLink;
