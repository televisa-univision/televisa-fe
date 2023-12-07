import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import isValidFunction from '@univision/fe-utilities/helpers/common/isValidFunction';

import supportsIntersection from './helper';

/**
 * useIsMounted hook
 * @returns {boolean}
 */
export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => false;
  }, []);

  return isMounted.current;
};

/**
 * useIsInView hook
 * @param {string} options - intersection options
 * @returns {boolean}
 */
export const useIsInView = (options) => {
  const {
    margin = 0,
    percentage = 0.8,
  } = options || {};
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef();

  const supportsIntersectionObserver = supportsIntersection();

  useLayoutEffect(() => {
    const { current: element } = ref;

    if (!supportsIntersectionObserver) {
      setIntersecting(true);
    }

    const observer = supportsIntersectionObserver && new IntersectionObserver(([entry]) => {
      const isIntersectingValue = entry.intersectionRatio >= percentage;
      if (isIntersecting !== isIntersectingValue) {
        setIntersecting(isIntersectingValue);
      }
    }, { rootMargin: `${margin}px`, threshold: [0, 0.25, 0.45, 0.5, 0.75, 1] });

    if (element && supportsIntersectionObserver) observer.observe(element);

    return () => {
      if (supportsIntersectionObserver) {
        observer.unobserve(element);
      }
    };
  }, [margin, percentage, isIntersecting, supportsIntersectionObserver]);

  return [ref, isIntersecting];
};

/**
 * VisibilityWrapper
 * @param {props} props - component props
 * @param {Array|element|func|Node} props.children - component child
 * @param {func} props.onHide - onHide callback, it will trigger if its visible
 * @param {func} props.onShow - onShow callback, it will trigger if its not visible
 * @param {func} props.id - id of the shown component
 * @returns {JSX}
 */
const VisibilityWrapper = ({
  children,
  className,
  onHide,
  onShow,
  id,
}) => {
  const [ref, isIntersecting] = useIsInView();
  const isMounted = useIsMounted();

  if (isMounted) {
    if (isIntersecting && isValidFunction(onShow)) {
      onShow(id);
    } else if (isValidFunction(onHide)) {
      onHide();
    }
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

VisibilityWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
  ]),
  className: PropTypes.string,
  id: PropTypes.string,
  onHide: PropTypes.func,
  onShow: PropTypes.func,
};

export default VisibilityWrapper;
