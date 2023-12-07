import React from 'react';

import hints from './resourceHints.json';

/**
 * Component for generating resource hints
 * @returns {JSX}
 */
function ResourceHint() {
  const preloadTypes = ['preload', 'preconnect'];
  const links = [];

  for (let i = 0, len = hints.length; i < len; i += 1) {
    const hintData = hints[i];
    const key = `${hintData.href}${hintData.rel}`;

    if (preloadTypes.includes(hintData.rel)) {
      links.push(<link key={key} rel={hintData.rel} href={hintData.href} as={hintData.as} crossOrigin="true" />);
    } else {
      links.push(<link key={key} rel={hintData.rel} href={hintData.href} />);
    }
  }
  return links;
}

export default ResourceHint;
