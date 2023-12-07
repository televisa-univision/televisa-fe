import React from 'react';
import PropTypes from 'prop-types';
import ThemeStyle from '@univision/fe-commons/dist/utils/themes/ThemeStyle';
import { stripTagsHtml } from '@univision/fe-commons/dist/utils/helpers';

/**
 * Wrapper for dangerouslySetInnerHTML
 * @param {string} html to render
 * @param {bool} strip to render
 * @returns {JSX}
 */
const RichText = ({
  html,
  strip,
  className,
  ...rest
}) => {
  const isHtmlString = (typeof html === 'string');
  const withoutHTML = strip || !isHtmlString;
  return (
    !withoutHTML
      ? (
        <ThemeStyle parentCssElement={className && `.${className.split(/\s+/).join('.')}`}>
          {(<div
            id="rich-text"
            className={className}
            dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
            {...rest}
          />)}
        </ThemeStyle>
      )
      : (
        <div className={className} {...rest}>
          {
            strip && isHtmlString ? stripTagsHtml(html) : <ThemeStyle>{html}</ThemeStyle>
          }
        </div>
      )
  );
};

RichText.propTypes = {
  html: PropTypes.string.isRequired,
  strip: PropTypes.bool,
  className: PropTypes.string,
};
RichText.defaultProps = {
  strip: false,
};

export default RichText;
