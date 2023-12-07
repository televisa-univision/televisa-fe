import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as pageCategories from '@univision/fe-commons/dist/constants/pageCategories';
import * as pageActions from '@univision/fe-commons/dist/store/actions/page-actions';
import { setWidgetExtraData } from '@univision/fe-commons/dist/store/actions/page-actions';

import SoccerMatchHeader, { onStickyChangeHandler } from '.';

const store = configureStore();

const page = {
  pageCategory: pageCategories.SOCCER_MATCH_PRE,
  data: {
    eventStatus: 'pre-event',
  },
};

/**
 * Create a new SoccerMatchHeader widget
 * @param {Object} props - additional props for creation
 * @param {function} createType - the function creation
 * @access private
 * @returns {JSX}
 */
const makeSoccerMatchHeader = (props = {}, createType = mount) => {
  const openingWidget = <div>Opening</div>;

  const element = (
    <Provider store={store}>
      <SoccerMatchHeader
        {...{
          pageData: page.data,
          pageCategory: page.pageCategory,
          openingWidget,
          ...props,
        }}
      />
    </Provider>
  );
  return createType(element);
};

describe('SoccerMatchHeader', () => {
  beforeEach(() => {
    console.info = jest.fn(); // eslint-disable-line no-console
    console.error = jest.fn(); // eslint-disable-line no-console
    beforeAll(async () => {
      await preloadAll();
    });
  });

  it('should return correctly', () => {
    const provider = makeSoccerMatchHeader({}, mount).children();
    const wrapper = provider.children();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.childAt(0).name()).toEqual('Header');
    expect(wrapper.find('SoccerMatchHeader__OpeningWrapper')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchHeader__OpeningWrapper').findWhere(n => (
      n.name() === 'StickyWrapper'
    ))).toHaveLength(1);
  });

  it('should dispatch "setWidgetExtraData" action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const wrapper = makeSoccerMatchHeader({}, mount);
    const StickyWrapper = wrapper.findWhere(n => (
      n.name() === 'StickyWrapper'
    ));
    StickyWrapper.prop('onChange')(true);

    expect(dispatchSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        settings: { compact: true },
      }),
    );
    dispatchSpy.mockRestore();
  });

  it('should not dispatch "setWidgetExtraData" action if already is compact and set state showGlobalNav to false', () => {
    const setWidgetExtraDataSpy = jest.spyOn(pageActions, 'setWidgetExtraData');
    const wrapper = makeSoccerMatchHeader({ matchId: 1234 }, mount);
    const StickyWrapper = wrapper.findWhere(n => (
      n.name() === 'StickyWrapper'
    ));
    StickyWrapper.prop('onChange')(false);

    expect(setWidgetExtraDataSpy).not.toHaveBeenCalled();
    expect(wrapper.find('SoccerMatchHeader__OpeningWrapper')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchHeader__OpeningWrapper')).toHaveStyleRule('height', '265px');
    setWidgetExtraDataSpy.mockRestore();
  });

  it('should return correctly with no match id', () => {
    const provider = makeSoccerMatchHeader({ matchId: null }, mount).children();
    const wrapper = provider.children();

    expect(wrapper).toHaveLength(1);
    expect(wrapper.childAt(0).name()).toEqual('Header');
    expect(wrapper.find('SoccerMatchHeader__OpeningWrapper')).toHaveLength(1);
    expect(wrapper.find('SoccerMatchHeader__OpeningWrapper')).toHaveStyleRule('height', '190px');
  });
  it('should call dispatch with the correct arguments when isSticky is different from compact', () => {
    const self = { current: { compact: false, settings: { uid: 123 } } };
    const dispatch = jest.fn();
    const isSticky = true;

    const handler = onStickyChangeHandler(self, dispatch);
    handler(isSticky);

    expect(self.current.compact).toBe(true);
    expect(dispatch).toHaveBeenCalledWith(setWidgetExtraData(123, null, { compact: isSticky }));
  });
});
