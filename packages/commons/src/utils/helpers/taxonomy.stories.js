import React from 'react';
import PropTypes from 'prop-types';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import getPrimaryCategory from './categoryTheme';

/**
 * Caption component
 * @param {Object} props Properties
 * @returns {JSX}
 */
const TaxonomyCpm = ({ pageCategory }) => (
  <div>
    <p>Page Category: {pageCategory}</p>
  </div>
);

TaxonomyCpm.propTypes = {
  pageCategory: PropTypes.string,
};

const pageObjs = [
  {
    path: '/deportes/futbol/mls',
    primaryTag: {
      link: 'https://www.univision.com/deportes/futbol/mls',
      name: 'MLS',
    },
    uri: '/deportes/futbol/mls',
    tagHierarchy: [
      { name: 'deportes', url: 'https://www.univision.com/temas/deportes' },
      { name: 'futbol', url: 'https://www.univision.com/deportes/futbol' },
      { name: 'competencias de futbol', url: 'https://www.univision.com/temas/competencias-de-futbol' },
      { name: 'mls', url: 'https://www.univision.com/deportes/futbol/mls' },
    ],
  },
  {
    path: '/deportes/futbol/europa',
    primaryTag: {
      link: 'https://www.univision.com/deportes/futbol/europa',
      name: 'Fútbol Europa',
    },
    uri: '/deportes/futbol/europa',
    tagHierarchy: [
      { name: 'deportes', url: 'https://www.univision.com/temas/deportes' },
      { name: 'futbol', url: 'https://www.univision.com/deportes/futbol' },
      { name: 'futbol europa', url: 'https://www.univision.com/deportes/futbol/europa' },
    ],
  },
];

const Stories = storiesOf('Taxonomy');
pageObjs.forEach((obj) => {
  Stories.add(
    `Path: ${obj.path}`,
    withInfo('Applies the theme associated with the current url')(() => (
      <TaxonomyCpm pageCategory={getPrimaryCategory(obj, obj.path)} />
    ))
  );
});
