import React from 'react';
import { shallow } from 'enzyme';
import { actions } from '@univision/fe-commons/dist/utils/helpers/history';
import { EVENT_PUSH_SPA_STATE } from '@univision/fe-commons/dist/constants/spa';
import Router from '.';

describe('SpaShell Router', () => {
  it('should render children', () => {
    const wrapper = shallow(
      <Router
        history={{
          listen: (cb) => {
            cb('test', actions.PUSH);
          },
        }}
      >
        <h1>test</h1>
      </Router>,
    );
    expect(wrapper.find('h1').text()).toEqual('test');
  });

  it('should remove listeners in componentWillUnmount', () => {
    spyOn(window, 'removeEventListener');
    const wrapper = shallow(<Router history={{ listen: () => {} }} />);
    const instance = wrapper.instance();
    instance.unlisten = jest.fn();
    instance.componentWillUnmount();
    expect(window.removeEventListener)
      .toHaveBeenCalledWith(EVENT_PUSH_SPA_STATE, instance.pushSpaState);
    expect(instance.unlisten).toHaveBeenCalled();
  });

  it('should not call unlisten in componentWillUnmount if it doesnt exist', () => {
    const wrapper = shallow(<Router history={{ listen: () => {} }} />);
    const instance = wrapper.instance();
    instance.unlisten = null;
    instance.componentWillUnmount();
    expect(instance.unlisten).toEqual(null);
  });

  it('should listen to the pushSpaState event', () => {
    const history = {
      push: jest.fn(),
      listen: jest.fn(),
    };
    shallow(<Router history={history} />);
    global.window.dispatchEvent(new CustomEvent(EVENT_PUSH_SPA_STATE, {
      detail: {
        path: '/test',
        url: 'https://www.univision.com/test',
      },
    }));
    expect(history.push).toHaveBeenCalledWith('/test', { url: 'https://www.univision.com/test' });
  });
});
