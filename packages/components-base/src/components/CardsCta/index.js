import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { isValidObject } from '@univision/fe-commons/dist/utils/helpers';
import { WHITE } from '@univision/fe-commons/dist/utils/styled/constants';
import Icon from '@univision/fe-icons/dist/components/Icon';

import Link from '../Link';
import Styles from './CardsCta.styles';

const Cta = styled(Link).attrs({ className: 'uvs-font-c-regular' })`
  ${Styles.cta}
`;

const ArrowRight = styled(Icon).attrs({
  fill: WHITE,
  name: 'arrowRight',
  size: 16,
})`${Styles.arrowRight}`;

/**
 * Cards CTA component
 * @returns {JSX}
 */
const CardsCta = ({
  label,
  onClick,
  seeMoreLink,
}) => {
  if (!isValidObject(seeMoreLink) || !seeMoreLink.href) return null;

  return (
    <Cta
      href={seeMoreLink.href}
      target={seeMoreLink.target}
      onClick={onClick}
    >
      {label}
      <ArrowRight />
    </Cta>
  );
};

CardsCta.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  seeMoreLink: PropTypes.shape({
    href: PropTypes.string,
    target: PropTypes.string,
  }),
};

export default CardsCta;
