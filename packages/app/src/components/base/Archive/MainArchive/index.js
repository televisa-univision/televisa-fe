import React from 'react';
import PropTypes from 'prop-types';

/**
 * Main Archive page
 * @param {Object} props - props of the component
 * @returns {JSX}
 */
const MainArchive = ({ yearsAvailable }) => {
  const content = yearsAvailable.map(year => (
    <p key={`year-${year}`}><a href={`./archivo/${year}`}>{year}</a></p>
  ));

  return (
    <>
      <h1>Archivo</h1>
      {content}
    </>
  );
};

MainArchive.propTypes = {
  yearsAvailable: PropTypes.array,
};

MainArchive.defaultProps = {
  yearsAvailable: [],
};

export default MainArchive;
