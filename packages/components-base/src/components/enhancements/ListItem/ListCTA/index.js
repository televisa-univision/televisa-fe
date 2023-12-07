import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';

import Link from '../../../Link';
import Styles from './ListCTA.styles';

export const ButtonLink = styled(Link).attrs({ className: 'uvs-font-c-bold' })`${Styles.buttonLink}`;
export const ButtonWrapper = styled.div`${Styles.buttonWrapper}`;
export const Title = styled.h3.attrs({ className: 'uvs-font-c-bold' })`${Styles.title}`;
export const Wrapper = styled.div`${Styles.wrapper}`;

/**
 * ListCTA Component
 * @param {Object} props - component props
 * @param {Object} [props.eCommerceCtas] - list call to actions buttons
 * @returns {JSX}
 */
const ListCTA = ({ eCommerceCtas, trackingListActionsBtnCTA }) => {
  return (
    isValidArray(eCommerceCtas) && eCommerceCtas.map(({ title, link }) => (
      <Wrapper key={link?.uid}>
        {title && (
          <Title>{title}</Title>
        )}
        <ButtonWrapper onClick={() => trackingListActionsBtnCTA(title, link.text, link.href)}>
          {link?.text && (
            <ButtonLink href={link?.href} target={link?.target}>
              {link.text}
            </ButtonLink>
          )}
        </ButtonWrapper>
      </Wrapper>
    ))
  );
};

ListCTA.propTypes = {
  eCommerceCtas: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.shape({
        href: PropTypes.string,
        target: PropTypes.string,
        text: PropTypes.string,
        uid: PropTypes.string,
      }),
    })
  ),
  trackingListActionsBtnCTA: PropTypes.func,
};

export default ListCTA;
