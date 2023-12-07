import React from 'react';
import { shallow } from 'enzyme';
import { actions } from '@univision/fe-commons/dist/utils/helpers/history';
import { EVENT_PUSH_SPA_STATE } from '@univision/fe-commons/dist/constants/spa';
import Router from './Router';

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
      </Router>
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

  it('should set the document title if exists', () => {
    const props = {
      history: {
        listen: (cb) => {
          cb('test');
        },
      },
      data: {
        title: 'Document title',
      },
    };
    const wrapper = shallow(<Router {...props} />);
    const instance = wrapper.instance();
    instance.componentDidUpdate();
    expect(document.title).toEqual(props.data.title);
    const newData = { title: 'New document title' };
    wrapper.setProps({ data: newData });
    expect(document.title).toEqual(newData.title);
  });

  it('should leave title untouched if new title does not exist', () => {
    const props = {
      history: {
        listen: (cb) => {
          cb('test');
        },
      },
      data: {
        title: 'Document title',
      },
    };
    const wrapper = shallow(<Router {...props} />);
    const instance = wrapper.instance();
    instance.componentDidUpdate();
    const newData = {};
    wrapper.setProps({ data: newData });
    expect(document.title).toEqual(props.data.title);
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
