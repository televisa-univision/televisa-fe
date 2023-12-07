import React from 'react';
import PropTypes from 'prop-types';

/**
 * Yearly archive component
 * @param {Object} props - props of the component
 * @returns {JSX}
 */
const YearlyArchive = ({
  numberOfPagesByMonth,
  year,
}) => {
  const content = Object.keys(numberOfPagesByMonth).map(item => (
    <p key={`item-${item}`}><a href={`/archivo/${year}/${item}/1`}>{item}</a></p>
  ));

  return (
    <>
      <h1>Archivo {year}</h1>
      {content}
    </>
  );
};

YearlyArchive.propTypes = {
  numberOfPagesByMonth: PropTypes.object,
  year: PropTypes.string,
};

YearlyArchive.defaultProps = {
  numberOfPagesByMonth: {},
};

export default YearlyArchive;
