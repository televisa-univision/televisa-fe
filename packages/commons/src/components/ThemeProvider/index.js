import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { isValidObject } from '../../utils/helpers';

/**
 * ThemeProvider for univison
 * @param {func} children - component childs
 * @param {Object} theme - theme options
 * @returns {JSX}
 */
const ThemeProviderUVN = ({ children, theme }) => {
  if (!children) return null;

  if (isValidObject(theme)) {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          {children}
        </Fragment>
      </ThemeProvider>
    );
  }

  return children;
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.array,
  ]),
  theme: PropTypes.object,
};

ThemeProvider.defaultProps = {
  theme: {},
};

export default ThemeProviderUVN;
