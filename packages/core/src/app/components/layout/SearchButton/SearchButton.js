import PropTypes from 'prop-types';
import React from 'react';

import Link from '@univision/fe-components-base/dist/components/Link';

/**
 * SearchButton compound component.
 * {@link Link}
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const SearchButton = ({ className }) => {
  return (
    <div className={className}>
      <Link href="https://www.univision.com/search">
        SEARCH
      </Link>
    </div>
  );
};

/**
 * propTypes
 * @property {String} class Class name of the element
 */
SearchButton.propTypes = {
  className: PropTypes.string,
};

/**
 * propTypes
 * @property {String} class Default class to render
 */
SearchButton.defaultProps = {
  className: '',
};

export default SearchButton;
