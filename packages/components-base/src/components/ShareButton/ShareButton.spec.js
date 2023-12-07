import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import Link from '../Link';
import ShareButton from '.';

/**
 * build the share button component
 * @param {Object} props - props for the component
 * @param {Object} initialState - initial state for the store
 * @returns {JSX}
 */
const makeShareButton = (props = {}, initialState = {}) => {
  const store = configureStore(initialState);
  return (
    <Provider store={store}>
      <ShareButton {...props} />
    </Provider>
  );
};
/** @test {ShareButton} */
describe('ShareButton ', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(makeShareButton({ name: 'facebook' }));
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render the css classes', () => {
    const className = 'blue';
    const wrapper = mount(makeShareButton({ name: 'facebook', className, theme: 'color' }));
    expect(wrapper.find(`.${className}`).length).toBe(4);
  });

  it('should not render extraneous classes', () => {
    const className = 'blue';
    const wrapper = mount(makeShareButton({ name: 'facebook', className }));
    /* eslint-disable jsx-a11y/anchor-is-valid */
    expect(wrapper.find(<Link className="nonExistingClass" />).length).toBe(0);
  });

  it('should render the comparte text', () => {
    const wrapper = mount(makeShareButton({ name: 'facebook', comparte: true }));
    expect(wrapper.children()).toBeTruthy();
  });

  it('should include text when prop is passed', () => {
    const wrapper = mount(makeShareButton({ name: 'facebook', text: 'MockText' }));
    expect(wrapper.children()).toBeTruthy();
  });

  it('should render mail button', () => {
    const wrapper = mount(makeShareButton({ name: 'mail', text: 'MockText' }));
    expect(wrapper.children()).toBeTruthy();
  });

  it('should render dark theme button', () => {
    const wrapper = mount(makeShareButton({ name: 'facebook', dark: true }));
    expect(wrapper.children()).toBeTruthy();
  });

  it('should render rounded button', () => {
    const wrapper = mount(makeShareButton({ name: 'facebook', theme: 'rounded' }));
    expect(wrapper.children()).toBeTruthy();
  });

  it('should render with isTelevisa prop', () => {
    const initialState = {
      page: {
        parentSite: 'televisa',
      },
    };
    const props = {
      name: 'facebook',
      theme: 'dark',
    };
    const wrapper = mount(makeShareButton(props, initialState));
    expect(wrapper.children()).toBeTruthy();
  });
});
