import isClientSide from '@univision/fe-utilities/helpers/common/isClientSide';

export default () => {
  return isClientSide()
    && 'IntersectionObserver' in window
    && 'IntersectionObserverEntry' in window;
};
