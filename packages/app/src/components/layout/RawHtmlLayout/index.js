import React from 'react';
import PropTypes from 'prop-types';

/**
 * RawHtml page layout without additional markup
 * because the page already must have the necesary content/html
 * @param {Node} props.children - react element to be render
 * @returns {JSX}
 */
const RawHtmlLayout = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

RawHtmlLayout.propTypes = {
  children: PropTypes.node,
};

export default RawHtmlLayout;
