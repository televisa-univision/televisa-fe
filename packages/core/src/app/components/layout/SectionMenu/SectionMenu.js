import PropTypes from 'prop-types';
import React from 'react';

import Button from '@univision/fe-components-base/dist/components/Button';

/**
 * SectionMenu compound component.
 * {@link Link}
 * @param {Object} props React Props for this component
 * @returns {JSX}
 * @constructor
 */
const SectionMenu = ({ className, label }) => {
  return (
    <div className={className}>
      <Button onClick={() => 'Section Menu Button clicked!'}>
        <span>{label}</span>
      </Button>
    </div>
  );
};

/**
 * propTypes
 * @property {String} class Class name of the element
 * @property {String} label Label of the menu button
 */
SectionMenu.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};

/**
 * propTypes
 * @property {String} class Default class to render
 * @property {String} label Default label to render
 */
SectionMenu.defaultProps = {
  className: '',
  label: 'Secciones',
};

export default SectionMenu;
