import React from 'react';
import PropTypes from 'prop-types';
import WidgetTitle from '@univision/shared-components/dist/components/v2/WidgetTitle';
import TitleWrapper from '@univision/shared-components/dist/components/v2/TitleWrapper';

/**
 * Prematch title to webview or widget
 * @param {Object} props - the component props
 * @returns {JSX}
 */
const PreMatchTitle = ({ title }) => {
  return (
    <TitleWrapper>
      <WidgetTitle>{title}</WidgetTitle>
    </TitleWrapper>
  );
};

/**
 * @property {boolean} isBlack - true use the widget title v2
 * @property {string} title - the widget title
 */
PreMatchTitle.propTypes = {
  title: PropTypes.string,
};

export default PreMatchTitle;
