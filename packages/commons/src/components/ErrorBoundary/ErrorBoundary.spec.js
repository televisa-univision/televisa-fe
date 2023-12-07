import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import preloadAll from 'jest-next-dynamic';
import * as clientLogging from '../../utils/logging/clientLogging';
import ErrorBoundary from '.';

describe('ErrorBoundary', () => {
  let props;

  beforeEach(() => {
    console.info = jest.fn(); // eslint-disable-line no-console
    console.error = jest.fn(); // eslint-disable-line no-console
    props = {
      children: 'hello!',
    };
  });

  beforeAll(async () => {
    await preloadAll();
  });

  it('returns children if no error', () => {
    const wrapper = shallow(<ErrorBoundary {...props} />);
    expect(wrapper.text()).toContain(props.children);
  });

  it('should getDerivedStateFromError', () => {
    const err = ErrorBoundary.getDerivedStateFromError('test-error');
    expect(err).toEqual({
      hasError: true,
      error: 'test-error',
    });
  });

  it('returns null if error is present with no fallback render', () => {
    const wrapper = shallow(<ErrorBoundary {...props} />);
    wrapper.instance().componentDidCatch('error', 'info');
    expect(wrapper.getElement()).toEqual(null);
  });

  it('calls fallbackRender on error if it exists', () => {
    props.fallbackRender = () => 'oops!';
    const wrapper = shallow(<ErrorBoundary {...props} />);
    wrapper.setState({ hasError: true });
    expect(wrapper.text()).toEqual('oops!');
  });

  it('should call onCatch function if defined', async () => {
    jest.spyOn(clientLogging, 'default').mockImplementation(() => Promise.resolve());
    const onCatchMock = jest.fn();
    const wrapper = shallow(<ErrorBoundary {...props} onCatch={onCatchMock} />);
    await wrapper.instance().logAndHandleError('error', 'info');
    expect(onCatchMock).toHaveBeenCalledTimes(1);
  });
  // TODO: Add test to cover the line 50 in ErrorBoundary.js
});
