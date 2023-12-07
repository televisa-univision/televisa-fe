import React from 'react';
import PropTypes from 'prop-types';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import isValidObject from '@univision/fe-utilities/helpers/common/isValidObject';
import WorldCup from '@univision/fe-deportes/dist/components/widgets/WorldCup';
import SingleWidget from '@univision/fe-components-base/dist/components/widgets/SingleWidget';

/**
 * Determines which component to load based on content type
 * @param {Object} props - component props
 * @returns {JSX}
 */
const SingleWidgetLoader = (props) => {
  const { cardData, content } = props;
  const [, singleWidgetData] = isValidArray(cardData) ? cardData : [];
  const [firstItem = {}] = isValidArray(content) ? content : [];

  // Load WC widget logic
  if (!singleWidgetData
      && firstItem?.seasonId
      && isValidObject(firstItem?.soccerCompetition)
  ) {
    const { widgetContext } = props;
    const worldCupWidgetContext = {
      ...widgetContext,
      name: 'World Cup Custom Widget',
      widgetType: 'WorldCupWidget',
    };

    return (<WorldCup widgetContext={worldCupWidgetContext} />);
  }

  return (<SingleWidget {...props} />);
};

SingleWidgetLoader.propTypes = {
  cardData: PropTypes.array,
  content: PropTypes.array,
  widgetContext: PropTypes.object,
};

export default SingleWidgetLoader;
