import React from 'react';

import componentMapping from './mapping';

/**
 * Factory for building a widget.
 * To test it: http://localhost:3000/univision/component/Footer/hideSearch/true/hideLink/tvshows/pageUri/.noticias
 * @param {Object} initialState Initial state
 * @returns {JSX}
 */
export default function getComponent(initialState = {}) {
  const {
    component,
    props,
  } = initialState;

  const Component = componentMapping[component];

  if (!Component) return null;

  return <Component {...props} />;
}
