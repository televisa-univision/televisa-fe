import React, { createContext } from 'react';

const RouterContext = createContext({});

export default RouterContext;

/**
   * withRouterContext HOC Component
   * @param {JSX} Component the jsx component
   * @returns {JSX}
   */
export function withRouterContext(Component) {
  /**
  * Wrapped component
  * @param {Object} props - the wrapped components properties
  * @returns {JSX}
  */
  const WithRouterContextComponent = (props) => {
    return (
      <RouterContext.Consumer>
        {
          (ctx) => {
            return <Component {...ctx} {...props} />;
          }
        }
      </RouterContext.Consumer>
    );
  };

  WithRouterContextComponent.displayName = Component.displayName || Component.name;

  return WithRouterContextComponent;
}
