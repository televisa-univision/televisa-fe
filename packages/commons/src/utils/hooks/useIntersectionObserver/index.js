import { useRef, useState, useEffect } from 'react';

import isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';

/**
 * custom hook that use intersection observer
 * @param {Object} params hook params
 * @param {Object} params.root element
 * @param {string} params.rootMargin of the intersected element
 * @param {number} params.threshold of the intersected element
 * @returns {Object}
 */
const useIntersectionObserver = ({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  disable,
} = {}) => {
  const enableObserver = isClientSide() && global.window.IntersectionObserver && !disable;
  const [entries, setEntries] = useState([]);
  const elRef = useRef(null);
  /* Avoid to re-instantiate the observer if component is re-render */
  const observerRef = useRef(enableObserver
    ? new IntersectionObserver(
      currentEntries => setEntries(currentEntries),
      { root, rootMargin, threshold },
    )
    : null);

  useEffect(() => {
    const currentObserver = observerRef?.current;
    if (currentObserver) {
      currentObserver.disconnect();

      if (elRef?.current) currentObserver.observe(elRef.current);
    }
    return () => currentObserver?.disconnect();
  }, [elRef, observerRef]);

  return { elRef, observerRef, entries };
};

export default useIntersectionObserver;
