import React, { memo } from 'react';
import {
  isValidType,
} from '@univision/fe-commons/dist/store/slices/user/favoritesMapper';
import WithPersonalizedWidgetContainer from './WithPersonalizedWidgetContainer';

/**
 * HOC that will replace the cards content of a widget
 * per cards personalized content
 * This HOC is intended to be used for a widget
 * @param {Object} WidgetWrappedComponent widget component that will render the cards list
 * @param {string} propCardsPath prop to know where is the cards content inside the widget props
 * @returns {React.Component}
 */
export default (WidgetWrappedComponent, propCardsPath) => {
  /**
   * Wrapper around the component WithPersonalizedWidgetConnect
   * @param {Object} props of component
   * @returns {React.Component}
   */
  const WithPersonalizedWidgetWrapper = (props) => {
    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    const { personalizationType } = props?.settings ?? {};
    // If there is not personalization type fallback
    // to the default Widget Behavior

    // eslint-disable-next-line react/destructuring-assignment, react/prop-types
    const propCardsPathValue = props.propCardsPath;

    if (
      !isValidType(personalizationType)
      || !propCardsPathValue) {
      return <WidgetWrappedComponent {...props} />;
    }

    return (
      <WithPersonalizedWidgetContainer
        {...props}
        propCardsPath={propCardsPath}
        WidgetWrappedComponent={WidgetWrappedComponent}
      />
    );
  };

  return memo(WithPersonalizedWidgetWrapper);
};
