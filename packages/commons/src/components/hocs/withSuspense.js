import React, { Suspense } from 'react';
/**
* HOC to add lazy loading to a component
* @param {Node} WrappedComponent component to be Suspense
* @param {Node} fallback used for Suspense
* @returns {React.Component}
*/
const withSuspense = (WrappedComponent, fallback) => (props) => {
  return (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <WrappedComponent {...props} />
    </Suspense>
  );
};

export default withSuspense;
