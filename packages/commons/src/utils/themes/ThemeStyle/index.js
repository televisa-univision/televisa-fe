/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Store from '../../../store/store';
import Styles from './ThemeStyle.scss';
import { isAmp, getTheme } from '../../../store/storeHelpers';
import {
  getKey,
  hasKey,
  sanitizeHtml,
} from '../../helpers';
import features from '../../../config/features';

/**
 * ThemeStyle - Applies theme
 * Currently only supports color inside paragraphs
 * @param {string} parentCssElement custom parent CSS Element to apply the theme style.
 * @param {Object} children to render inside component
 * @returns {JSX}
 */
const ThemeStyle = ({ parentCssElement, children }) => {
  if (isAmp(Store)) {
    return children;
  }
  const theme = getTheme(Store);
  if (!theme || !hasKey(theme, 'primary') || !hasKey(theme, 'secondary')) {
    return children || null;
  }
  const isWorldCupMVP = features.deportes.isWorldCupMVP();

  // Theme defaults
  const defaultStyles = {
    a: isWorldCupMVP ? theme.anchor : theme.primary,
    'a:hover': theme.secondary,
  };

  // Custom overrides
  const customStyles = getKey(theme, 'custom', null);

  // Defaults + Custom
  const styles = {
    ...defaultStyles,
    ...customStyles,
  };

  // Combined styles
  let style = '';
  Object.keys(styles)
    .forEach((element) => {
      style += `.${Styles.container} ${parentCssElement || ''} ${element} { color: ${styles[element]}; } `;
    });

  const cleanStyle = { __html: sanitizeHtml(style) };

  return (
    <div className={Styles.container}>
      <style type="text/css" dangerouslySetInnerHTML={cleanStyle} />
      {children}
    </div>
  );
};

ThemeStyle.propTypes = {
  children: PropTypes.node,
  parentCssElement: PropTypes.string,
};

export default ThemeStyle;
