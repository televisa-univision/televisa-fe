import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Styles from './WidgetLogo.styles';

const Container = styled.div`
  ${Styles.container}
`;

/**
 * WidgetLogo component
 * @param {Object} props - props of the component
 * @property {string} props.logo - widget logo image url
 * @returns {JSX}
 */
const WidgetLogo = ({
  alt,
  logo,
  width,
  height,
}) => {
  if (!logo) {
    return null;
  }

  return (
    <Container>
      <img
        src={logo}
        width={width}
        height={height}
        alt={alt || 'Widget Logo'}
      />
    </Container>
  );
};

WidgetLogo.propTypes = {
  logo: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default WidgetLogo;
