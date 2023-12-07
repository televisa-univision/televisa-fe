/**
 * @module List Shows
 */
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from '@univision/fe-components-base/dist/components/Link';
import { getKey } from '@univision/fe-commons/dist/utils/helpers';

import { setPrendeTVCookie } from '../../../utils';
import Styles from './Shows.styles';

const Wrapper = styled.div`${Styles.wrapper}`;
const Row = styled.div`${Styles.row}`;
const Title = styled.h1`${Styles.title}`;
const Square = styled(Link)`${Styles.square}`;
const Image = styled.img`${Styles.image}`;

/**
 * Prende TV Shows Promo Card
 *
 * @param {Object} props - initial props of the component
 * @property {array} props.contents - array of shows object
 * @property {string} props.device - mobile or desktop
 * @property {string} props.headLine - the title of the component
 * @returns {JSX}
 */
const Shows = ({
  contents, device, headLine,
}) => {
  const [larger, setLarger] = useState(null);
  const rowReference = useRef(null);

  useEffect(() => {
    const squareWidth = (device === 'mobile' ? 67 : 107);
    const widthOfSquares = contents.length * squareWidth;
    const wrapperSize = rowReference.current.clientWidth;
    setLarger(wrapperSize < widthOfSquares);
  }, [device, contents.length]);

  return (
    <Wrapper>
      <Title>{headLine}</Title>
      <Row ref={rowReference} larger={larger}>
        {
          larger !== null && (
            contents.map(({
              uid, image, link, externalContentPromoType,
            }) => (
              <Square
                key={uid}
                href={link?.href}
                onClick={setPrendeTVCookie}
                device={device}
                target={link?.target}
                backgroundhover={externalContentPromoType?.backgroundColor}
              >
                <Image src={getKey(image, 'renditions.original.href')} />
              </Square>
            ))
          )
        }
      </Row>
    </Wrapper>
  );
};

Shows.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.string,
      link: PropTypes.object,
      image: PropTypes.object,
    })
  ).isRequired,
  device: PropTypes.string,
  headLine: PropTypes.string.isRequired,
};

export default Shows;
