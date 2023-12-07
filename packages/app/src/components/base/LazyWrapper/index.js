import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import isValidArray from '@univision/fe-utilities/helpers/common/isValidArray';
import useIntersectionObserver from '@univision/fe-commons/dist/utils/hooks/useIntersectionObserver';

/**
 * lazy wrapper with intersection observer
 * @param {Object} props react props
 * @param {JSX} props.children react children
 * @param {function} props.onShow callback when element is intersected
 * @param {bool} props.once check if element should be observed once
 * @param {string} props.offset of the element to be observe ie. (0px)
 * @returns {JSX}
 */
const LazyWrapper = ({
  children,
  onShow,
  once,
  offset,
}) => {
  const { elRef, entries, observerRef } = useIntersectionObserver({
    rootMargin: offset,
  });

  useEffect(() => {
    if (isValidArray(entries) && entries[0].isIntersecting) {
      onShow();

      if (once && observerRef?.current && elRef?.current) {
        observerRef.current.unobserve(elRef.current);
      }
    }
  }, [entries, onShow, observerRef, elRef, once]);

  return (
    <div ref={elRef}>
      {children}
    </div>
  );
};

LazyWrapper.propTypes = {
  children: PropTypes.node,
  once: PropTypes.bool,
  onShow: PropTypes.func,
  offset: PropTypes.string,
};

export default LazyWrapper;
