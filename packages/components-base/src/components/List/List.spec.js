import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import CardTracker from '@univision/fe-commons/dist/utils/tracking/tealium/card/CardTracker';
import ListWrapper from '.';
import content from './__mocks__/listDataMock';
import mockPageData from './__mocks__/pageDataMock';

/** @test {List} */
const title = 'Últimas Noticias';
const props = {
  contentList: content,
  title,
  widgetContext: {
    widgetType: 'Locales - Opening Widget',
    metaData: {
      cardName: 'LocalWeatherForecast - portrait XL - forecast',
    },
  },
};
const store = configureStore();

describe('List Component', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    store.dispatch(setPageData({
      env: 'test',
      language: 'es',
      device: 'mobile',
      data: {
        ...mockPageData.data,
      },
      requestParams: null,
    }));
    ReactDOM.render(<Provider store={store}><ListWrapper {...props} /></Provider>, div);
  });
  it('should not render a List without props', () => {
    const wrapper = mount(<Provider store={store}><ListWrapper /></Provider>);
    expect(wrapper.find('List__DataContainer')).toHaveLength(0);
  });
  it('should track the content clicks', () => {
    const trackerSpy = jest.spyOn(CardTracker, 'onClickHandler');
    const wrapper = mount(<Provider store={store}><ListWrapper {...props} /></Provider>);

    act(() => {
      wrapper.find('List__DataContent').first().props().onClick();
    });

    expect(trackerSpy).toHaveBeenLastCalledWith({
      title: content[0]?.title,
      uid: content[0]?.uid,
    }, {
      ...props.widgetContext,
      metaData: {
        cardName: 'article - List',
        cardType: 1,
      },
    }, 'content');
  });

  it('should render a List without crashing inside an adSkin page', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListWrapper {...props} hasAdSkin />
      </Provider>
    );

    expect(wrapper.find('List__ListWrapper')).toHaveLength(1);
  });
});
