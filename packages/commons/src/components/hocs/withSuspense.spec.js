import React, { lazy } from 'react';
import { shallow } from 'enzyme';
import withSuspense from './withSuspense';

/**
 * Dummy fallback component
 * @returns {JSX}
 */
const CustomFallback = () => <div>Loading</div>;
const LazyComponent = lazy(() => import('../ErrorBoundary'));

describe('withSuspense HOC tests', () => {
  it('should render component inside HOC', () => {
    const Component = withSuspense(LazyComponent);
    const wrapper = shallow(<Component />, { suspenseFallback: false });
    expect(wrapper.find(CustomFallback).length).toEqual(0);
    expect(wrapper.find(LazyComponent).length).toEqual(1);
  });
  it('should render component inside HOC with props', () => {
    const Component = withSuspense(LazyComponent, CustomFallback);
    const wrapper = shallow(<Component test="Test" />);
    expect(wrapper.props().test).toBe('Test');
  });
  it('should render component with fallback given', () => {
    const Component = withSuspense(LazyComponent, CustomFallback);
    const wrapper = shallow(<Component />);
    expect(wrapper.prop('fallback')).toEqual(CustomFallback);
  });
});
