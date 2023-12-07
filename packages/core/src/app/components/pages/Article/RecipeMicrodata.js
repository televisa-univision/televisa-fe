import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import defaultImage from '@univision/fe-commons/dist/assets/images/default-content-image.png';
import {
  isValidArray, getKey, isValidObject, capFirstLetter,
} from '@univision/fe-commons/dist/utils/helpers';

/**
 * Get ISO_8601 duration time
 * @param {(string|number)} minutes - a duration time
 * @returns {string}
 */
const toPeriodTime = (minutes) => {
  return minutes && `PT${minutes}M`;
};

/**
 * Parse array to comma list string
 * @param {string[]} value - list items
 * @returns {string}
 */
const toCommaList = (value) => {
  return isValidArray(value) && value.join(', ');
};

/**
 * Get recipe step with schema structure
 * @param {Array} steps - recipe steps list
 * @returns {Object[]}
 */
const gethowToSteps = (steps) => {
  if (!isValidArray(steps)) {
    return null;
  }
  const howToSteps = [];
  steps.forEach((step) => {
    howToSteps.push({
      '@type': 'HowToStep',
      text: step,
    });
  });
  return howToSteps;
};

/**
 * Get Json metadata
 * @param {Object} data - the pageData
 * @returns {Object}
 */
function getData(data) {
  let json = {};
  const {
    steps,
    sections,
    calories,
    cuisines,
    mealTypes,
    ingredients,
    preparationMinutes,
    cookMinutes,
    totalMinutes,
    yield: recipeYield,
  } = data.recipeData;
  const microdata = {
    '@context': 'http://schema.org/',
    '@type': 'Recipe',
    name: data.title,
    description: data.description,
    datePublished: data.publishDate,
    image: getKey(data.image, 'renditions.original.href', defaultImage),
    recipeIngredient: isValidArray(ingredients) && ingredients,
    recipeCuisine: toCommaList(cuisines),
    recipeCategory: toCommaList(mealTypes),
    keywords: toCommaList(getKey(data.seo, 'keywords')),
    recipeInstructions: gethowToSteps(steps),
    prepTime: toPeriodTime(preparationMinutes),
    cookTime: toPeriodTime(cookMinutes),
    totalTime: toPeriodTime(totalMinutes),
    recipeYield,
  };

  if (calories) {
    microdata.nutrition = {
      '@type': 'NutritionInformation',
      calories: `${calories} calories`,
    };
  }

  if (isValidArray(sections)) {
    microdata.recipeInstructions = sections.reduce((howToSection, section) => {
      howToSection.push({
        '@type': 'HowToSection',
        name: getKey(section, 'name', ''),
        itemListElement: gethowToSteps(getKey(section, 'steps')),
      });
      return howToSection;
    }, []);
  }

  if (isValidArray(data.authors)) {
    microdata.author = data.authors.reduce((result, author) => {
      result.push({
        '@type': capFirstLetter(getKey(author, 'type', '')),
        name: getKey(author, 'title', ''),
      });
      return result;
    }, []);
  }

  if (isValidObject(data.lead) && data.leadType === 'video') {
    const video = {
      name: getKey(data.lead, 'title', ''),
      description: getKey(data.lead, 'description', ''),
      thumbnailUrl: getKey(data.lead, 'image.renditions.original.href', defaultImage),
      uploadDate: getKey(data.lead, 'publishDate', ''),
      duration: getKey(data.lead, 'durationString', ''),
      expires: getKey(data.lead, 'expirationDate', ''),
    };
    microdata.video = [video];
  }

  // JSON.stringify will remove the undefined values
  json = JSON.stringify(microdata, (key, value) => (value || undefined), 2);
  return json;
}

/**
 * Micro-data component for articles type recipe
 * @param {Object} props - the component props
 * @access public
 * @returns {JSX}
 */
const RecipeMicrodata = ({ data }) => {
  // Only add in SSR and when have correctly data
  if (typeof window !== 'undefined' || !isValidObject(data) || !isValidObject(data.recipeData)) {
    return null;
  }

  const json = getData(data);

  return (
    <Helmet
      encodeSpecialCharacters={false}
    >
      <script type="application/ld+json">
        {json}
      </script>
    </Helmet>
  );
};

/**
 * propTypes
 * @property {Object} data - page data
 */
RecipeMicrodata.propTypes = {
  data: PropTypes.object,
};

RecipeMicrodata.defaultProps = {
  data: {},
};

export default RecipeMicrodata;
