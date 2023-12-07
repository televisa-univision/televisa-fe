import React from 'react';
import { shallow } from 'enzyme';

import ApiProvider from '.';

import fetchApi from '../../utils/api/fetchApi';
import setPageData from '../../store/actions/page-actions';
import { hasKey } from '../../utils/helpers';

jest.mock('../../utils/helpers', () => ({ hasKey: jest.fn() }));
jest.mock('../../utils/api/fetchApi', () => jest.fn(() => Promise.resolve({ foo: true })));
jest.mock('../../store/actions/page-actions', () => jest.fn());

let props;
beforeEach(() => {
  props = {
    url: 'http://',
    store: {},
  };
  console.error = jest.fn(); // eslint-disable-line no-console
});
describe('ApiProvider', () => {
  it('should render a loading message until fetchApi response', () => {
    const wrapper = shallow(<ApiProvider {...props} />);

    expect(wrapper.state()).toEqual({});
    expect(wrapper.text()).toBe('Loading...');
  });

  it('calls fetchApi in contructor and sets state when it resolves', () => {
    const wrapper = shallow(<ApiProvider {...props} />);

    return fetchApi().then((d) => {
      expect(wrapper.state()).toEqual(d);
    });
  });

  it('calls dispatches setPageData with fetchApi response', () => {
    props.store.dispatch = jest.fn();
    hasKey.mockReturnValueOnce(true);
    shallow(<ApiProvider {...props} />);
    return fetchApi().then((d) => {
      expect(props.store.dispatch).toBeCalledWith(setPageData(d));
    });
  });

  it('calls render prop if it is set', () => {
    props.render = jest.fn(() => <div />);
    const wrapper = shallow(<ApiProvider {...props} />);

    return fetchApi().then(() => {
      expect(props.render).toBeCalledWith(wrapper.state());
    });
  });
});
