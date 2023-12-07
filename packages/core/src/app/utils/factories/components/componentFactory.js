import React from 'react';
import Loadable from 'react-loadable';

import { hasKey } from '@univision/fe-commons/dist/utils/helpers';
import { EmptyPlaceholder } from '@univision/fe-components-base/dist/components/Placeholder';

import componentMapping from './mapping/index';

/**
 * Factory for building a widget.
 * To test it: http://localhost:8080/proxy/api/cached/component/Lineup/eventId/20300
 * @param {Object} initialState Initial state
 * @returns {JSX}
 */
export default function getComponent(initialState) {
  const {
    component,
    props,
  } = initialState;
  if (component && hasKey(componentMapping, component)) {
    const LoadableComponent = Loadable({
      loader: componentMapping[component],
      loading: EmptyPlaceholder,
    });

    return <LoadableComponent initialState={initialState} {...props} />;
  }
  return null;
}
