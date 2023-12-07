import React from 'react';
import PropTypes from 'prop-types';

/**
 * Monthly Archive component
 * @returns {JSX}
 */
const MonthlyArchive = ({
  contents,
  month,
  page,
  year,
}) => {
  const content = contents.map(item => (
    <div key={`item-${item.url}`}>
      <p>
        <a href={item.url}>
          {item.title}
        </a>
      </p>
    </div>
  ));
  return (
    <>
      <h1>{month} {year} - page {page}</h1>
      {content}
    </>
  );
};

MonthlyArchive.propTypes = {
  contents: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  month: PropTypes.string,
  page: PropTypes.number,
  year: PropTypes.string,
};

MonthlyArchive.defaultProps = {
  contents: [],
};

export default MonthlyArchive;
