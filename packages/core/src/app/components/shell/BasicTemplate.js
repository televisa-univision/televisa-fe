import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import React from 'react';

/**
 * Wrapper for rendering a simple html template
 * @param {Object} props Component props
 * @returns {JSX} rendered template/document
 */
const BasicTemplate = (props) => {
  const { scripts, initialState } = props;
  /* eslint-disable react/no-danger */
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {initialState && (
        <script
          id="initial-state"
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = ${serialize(initialState)};`,
          }}
          charSet="UTF-8"
        />
        )}
        {Array.isArray(scripts) && scripts.map((scriptSrc, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <script key={i} defer src={scriptSrc} charSet="UTF-8" />
        ))}
      </body>
    </html>
  );
};

/**
 * propTypes
 * @property {Object} scripts Scripts components
 */
BasicTemplate.propTypes = {
  scripts: PropTypes.arrayOf(PropTypes.node),
  initialState: PropTypes.object,
};

BasicTemplate.defaultProps = {
  scripts: [],
};

export default BasicTemplate;
