import React from 'react';
import { shallow, mount } from 'enzyme';
import { fetchSportApi } from '@univision/fe-commons/dist/utils/api/fetchApi';
import SportApiProvider from '.';

jest.mock(
  '@univision/fe-commons/dist/utils/api/fetchApi',
  () => ({
    fetchSportApi: jest.fn(() => new Promise((resolve, reject) => {
      resolve({});
      reject(new Error('something bad happened'));
    })),
  })
);

jest.useFakeTimers();

const props = {
  path: '/stats/soccer/934230',
  render: () => <div>Hello</div>,
};
describe('SportApiProvider', () => {
  it('should show warning if not function on render', () => {
    const wrapper = mount(<SportApiProvider path="/test" render={null} />);
    expect(wrapper.find('code').length).toBe(2);
  });

  it('should error fallback return null', () => {
    expect(SportApiProvider.errorFallback()).toBe(null);
  });

  it('should start timer if refreshRate > 0', () => {
    const wrapper = mount(<SportApiProvider path="/test" refreshRate={2} render={() => 'Hello!'} />);
    expect(wrapper.instance().timer).toBeDefined();
    expect(setInterval).toHaveBeenCalledTimes(1);
  });

  it('should call set interval if refreshRate > 0', () => {
    shallow(<SportApiProvider path="/test" refreshRate={10} render={() => 'Hello!'} />);
    jest.runOnlyPendingTimers();
    expect(setInterval).toBeCalled();
  });

  it('should clear interval if props.stopRefresh', () => {
    global.clearInterval = jest.fn();
    const wrapper = shallow(<SportApiProvider path="/test" refreshRate={10} render={() => 'Hello!'} />);
    wrapper.setProps({ stopRefresh: true });
    expect(global.clearInterval).toHaveBeenCalled();
  });

  it('should render error if state.error equal true', () => {
    const wrapper = shallow(<SportApiProvider path="/test" refreshRate={10} render={() => 'Hello!'} />);
    wrapper.setState({ error: true });
    expect(wrapper.find('ApiError').length).toBe(1);
  });

  it('should render component if state response not empty', () => {
    const wrapper = shallow(<SportApiProvider path="/test" render={() => 'Hello!'} />);
    wrapper.setState({
      response: {
        code: 200,
      },
    });
    expect(wrapper.find('ErrorBoundary').length).toBe(1);
  });

  it('should clear the interval when component unmounts', () => {
    global.clearInterval = jest.fn();
    const wrapper = mount(<SportApiProvider path="/test" refreshRate={10} render={() => 'Hello!'} />);
    wrapper.setProps({ stopRefresh: true });
    wrapper.instance().componentWillUnmount();
    expect(global.clearInterval).toHaveBeenCalled();
  });

  it('should not clear the interval when component unmounts', () => {
    global.clearInterval = jest.fn();
    const wrapper = mount(<SportApiProvider path="/test" render={() => 'Hello!'} />);
    wrapper.instance().componentWillUnmount();
    expect(global.clearInterval).not.toHaveBeenCalled();
  });
});

describe('fetchApi', () => {
  it('should sets state after fetch Api is resolved', () => {
    const wrapper = shallow(<SportApiProvider {...props} render={() => 'Hello!'} />);
    expect(wrapper.find('Loading').length).toBe(1);
  });

  it('should sets state after fetch Api is resolved', () => {
    const defaultState = {
      error: false,
      response: {},
    };
    const wrapper = shallow(<SportApiProvider {...props} cached={false} render={() => 'Hello!'} />);
    fetchSportApi().then(() => {
      expect(wrapper.state()).toEqual(defaultState);
    });
  });

  it('should state.error be true if api error', () => {
    fetchSportApi.mockReturnValueOnce(Promise.reject(new Error('something bad happened')));
    const wrapper = mount(<SportApiProvider {...props} cached={false} render={() => 'Hello!'} />);
    process.nextTick(() => expect(wrapper.state().error).toBe(true));
  });

  it('should state.error be true if api response status is not 200', () => {
    fetchSportApi.mockReturnValueOnce(Promise.resolve({ status: 500 }));
    const wrapper = mount(<SportApiProvider {...props} cached={false} render={() => 'Hello!'} />);
    process.nextTick(() => expect(wrapper.state().error).toBe(true));
  });
});
