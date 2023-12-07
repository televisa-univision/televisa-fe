import {
  useCallback, useState, useLayoutEffect, useRef,
} from 'react';
import mutation from '../../video/mutationDomChanges';
import { isEqual } from '../../helpers';

/**
 * Returns the position of the given DOM element.
 * @param {Element} el DOM element
 * @returns {{top: number, left: number}}
 */
export function getPosition(el) {
  if (!el || typeof el.getBoundingClientRect !== 'function') {
    return { top: 0, left: 0 };
  }
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left,
    top: rect.top + window.pageYOffset,
    width: rect.width,
    height: rect.height,
  };
}

/**
 * Hook to retrieve the position of a DOM element.
 * It will listen to window resizes to update the position.
 * @param {Element} ref DOM Element
 * @param {boolean} dep custom dependency
 * @returns {{top: *, left: *}}
 */
function usePosition(ref, dep) {
  const [ElementPosition, setElementPosition] = useState(getPosition(ref ? ref.current : null));
  const currentPosition = useRef(null);

  /** Updates the element position. */
  const handleChangePosition = useCallback(() => {
    if (ref && ref.current) {
      const pos = getPosition(ref.current);
      if (!isEqual(currentPosition.current, pos)) {
        setElementPosition(pos);
        currentPosition.current = pos;
      }
    }
  }, [ref]);

  useLayoutEffect(() => {
    handleChangePosition();
    const observer = mutation(document.querySelector('#app-root'));
    window.addEventListener('resize', handleChangePosition);

    if (observer) {
      document.addEventListener('DOMChildChanges', handleChangePosition);
    }

    return () => {
      window.removeEventListener('resize', handleChangePosition);
      if (observer) {
        document.removeEventListener('DOMChildChanges', handleChangePosition);
        observer.disconnect();
      }
    };
  }, [handleChangePosition, ref, dep]);

  return ElementPosition;
}

export default usePosition;
