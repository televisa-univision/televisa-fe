import React from 'react';
import { shallow } from 'enzyme';

import mockStore from '../../store/__mocks__/store';

import WithPage, { areStatePropsEqual } from './WithPage';

/**
 * Wrapped component
 * @param {string} profile - Sample WrappedComponent
 * @constructor
 */
const WrappedComponent = () => <div>WithPage</div>;

describe('WithPage', () => {
  const store = mockStore({
    page: {
      data: {
        uri: '/example/uri/for/test',
      },
      type: 'example-page-type',
    },
  });

  it('should have the page as a prop', () => {
    const WrappedWithPage = WithPage(WrappedComponent);
    const wrapper = shallow(<WrappedWithPage store={store} />);
    const expectedPageProp = store.getState().page;
    const props = wrapper.find('WrappedComponent').props();

    expect(props.page).toEqual(expectedPageProp);
  });
});

describe('areStatePropsEqual', () => {
  it('should return appropriate value', () => {
    const prevPage = {
      page: {
        data: {
          uri: 'page/1',
        },
      },
    };
    const nextPage = {
      page: {
        data: {
          uri: 'page/2',
        },
      },
    };
    expect(areStatePropsEqual(nextPage, prevPage)).toBeFalsy();
    expect(areStatePropsEqual(nextPage, nextPage)).toBeTruthy();
  });
});
