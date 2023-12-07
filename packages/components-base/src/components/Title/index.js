import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import features from '@univision/fe-commons/dist/config/features';

import Styles from './Title.styles';

const TitleStyled = styled.div`${Styles.title}`;
const TitleStyledMVP = styled.div`${Styles.titleMVP}`;

/**
 * Title Label base component.
 * @param {Object} props React Props for this component
 * @param {string} props.element tag name that should render teh title
 * @param {boolean} [props.hidden] true hide the title, just to be SEO friendly
 * @param {Node} props.children child component/element to render
 * @param {string} [props.className] class override
 * * @param {bool} [props.ctIsValid] flag valid for some CT MVP WorldCup
 * @param {bool} [props.isWorldCupMVP] flag for title rebrand MVP WorldCup
 * @param {(Object|Object[])} [props.style] for override component styles
 * @param {string} [props.size] title string size
 * @param {theme} [props.theme] theme definition with headlineFont data
 * @returns {JSX}
 * @constructor
 */
const Title = ({
  children,
  className,
  ctIsValid,
  fontName,
  element,
  hidden,
  size,
  style,
  theme,
  isWorldCupMVP,
}) => {
  const defaultFont = features.content.hasEnhancement() ? 'uvs-font-b-bold' : 'uvs-font-a-bold';
  const themeFont = theme?.headlineFont?.default;
  const fontClassName = fontName || themeFont || defaultFont;

  return (
    (isWorldCupMVP && ctIsValid) ? (
      <TitleStyledMVP
        as={element}
        style={style}
        hidden={hidden}
        size={size}
        className={`${fontClassName} ${className}`}
      >
        {children}
      </TitleStyledMVP>
    ) : (
      <TitleStyled
        as={element}
        style={style}
        hidden={hidden}
        size={size}
        className={`${fontClassName} ${className}`}
      >
        {children}
      </TitleStyled>
    )
  );
};

Title.propTypes = {
  element: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div']),
  hidden: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  ctIsValid: PropTypes.bool,
  fontName: PropTypes.string,
  isWorldCupMVP: PropTypes.bool,
  style: PropTypes.object,
  size: PropTypes.oneOf(['xsmall', 'small', 'regular', 'large']),
  theme: PropTypes.shape({
    headlineFont: PropTypes.shape({
      default: PropTypes.string,
    }),
  }),
};

/**
 * Default Prop Values
 */
Title.defaultProps = {
  element: 'h3',
};

export default Title;
