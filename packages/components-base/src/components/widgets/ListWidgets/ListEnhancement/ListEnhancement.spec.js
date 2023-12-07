import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { PRENDETV_PROMO } from '@univision/fe-commons/dist/constants/urls';
import WidgetTracker from '@univision/fe-commons/dist/utils/tracking/tealium/widget/WidgetTracker';

import * as paginateWidget from '@univision/fe-commons/dist/utils/api/widgets/pagination';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as getWidgetFlavorTheme from '@univision/fe-commons/dist/utils/helpers/widget/getWidgetFlavorTheme';
import widgetFlavor from '@univision/fe-commons/dist/constants/widgetFlavors';
import features from '@univision/fe-commons/dist/config/features';

import ListEnhancement from './ListConnector';
import mockData from './__mocks__/listContent.json';

const { content: contents } = mockData;
const listProps = {
  ...mockData,
};
const store = configureStore();

paginateWidget.default = jest.fn();
jest.useFakeTimers();

describe('List enhancement suite', () => {
  beforeEach(() => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={Store}><ListEnhancement {...listProps} theme={{}} /></Provider>,
      div
    );
  });
  it('should render the aside when desktop device is present', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...listProps} device="desktop" />
      </Provider>
    );
    expect(wrapper.find('aside')).toHaveLength(1);
  });
  it('should not render the aside when desktop device and flavor are present', () => {
    const flavorProps = {
      ...listProps,
      device: 'desktop',
      settings: {
        ...listProps.settings,
        flavor: 'test',
      },
    };
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...flavorProps} />
      </Provider>
    );
    expect(wrapper.find('aside')).toHaveLength(0);
  });
  it('should render white title for prendetv', () => {
    const flavorProps = {
      ...listProps,
      settings: {
        ...listProps.settings,
        flavor: widgetFlavor.FLAVOR_PRENDE_TV,
      },
    };
    store.dispatch(setPageData({
      pageCategory: 'show',
    }));
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...flavorProps} />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', '#ffffff');
  });
  it('should render dark mode if the setting is enabled', () => {
    const darkProps = {
      ...listProps,
      theme: {
        isDark: true,
      },
    };
    store.dispatch(setPageData({
      pageCategory: 'show',
    }));
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...darkProps} />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveStyleRule('color', '#ffffff');
  });
  it('should not render any cards if no cardData is available', () => {
    store.dispatch(setPageData({
      pageCategory: 'test',
    }));
    const newProps = {
      ...listProps,
      content: [],
    };
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...newProps} />
      </Provider>
    );
    expect(wrapper.find('ListEnhancement__CardWrapper')).toHaveLength(0);
  });
  it('should fallback to internal contentLimit when prop is 0', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...listProps} contentLimit={0} />
      </Provider>
    );
    expect(wrapper.find('ListCards__CardWrapper')).toHaveLength(6);
  });
  it('should load more local items when the load more button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...listProps} />
      </Provider>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('ListCards__CardWrapper')).toHaveLength(12);
  });
  it('should load from the API when no more local items are available', async () => {
    const newProps = {
      ...listProps,
      content: contents.slice(0, 7),
    };
    paginateWidget.default.mockReturnValueOnce({
      contents: contents.slice(6, 12),
    });
    jest.runAllTimers();
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...newProps} />
      </Provider>
    );
    await act(async () => {
      wrapper.find('button').first().props().onClick();
    });
    wrapper.update();
    expect(paginateWidget.default).toHaveBeenCalled();
    expect(wrapper.find('ListCards__CardWrapper')).toHaveLength(12);
  });
  it('should hide the load more button when API no longer returns more items', async () => {
    const newProps = {
      ...listProps,
      content: contents.slice(0, 7),
    };
    paginateWidget.default.mockReturnValueOnce({
      contents: [],
    });

    jest.runAllTimers();
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...newProps} />
      </Provider>
    );
    await act(async () => {
      wrapper.find('button').first().props().onClick();
    });
    wrapper.update();
    expect(paginateWidget.default).toHaveBeenCalled();
    expect(wrapper.find('ListCards__CardWrapper')).toHaveLength(6);
    expect(wrapper.find('Button')).toHaveLength(0);
  });
  it('should use the theme flavor when value is present', () => {
    const flavorProps = {
      ...listProps,
      settings: {
        ...listProps.settings,
        flavor: 'test',
      },
    };
    const getWidgetFlavorThemeSpy = jest.spyOn(getWidgetFlavorTheme, 'default')
      .mockReturnValue({ primary: '#000' });
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...flavorProps} />
      </Provider>
    );
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
    expect(getWidgetFlavorThemeSpy).toHaveBeenCalled();
  });
  it('should call the widget tracking when the title is clicked', () => {
    const flavorProps = {
      ...listProps,
    };
    const settings = {
      ...listProps.settings,
      titleLink: { href: PRENDETV_PROMO },
      flavor: widgetFlavor.FLAVOR_PRENDE_TV,
    };
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    const expectedCall = {
      target: 'prendetv_cta_external',
      extraData: {
        destination_url: PRENDETV_PROMO,
      },
      eventLabel: 'Widget_PosTitle',
    };
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...flavorProps} settings={settings} />
      </Provider>
    );
    const widgetTitle = wrapper.find('WidgetTitle Link');
    act(() => {
      widgetTitle.simulate('click');
    });
    wrapper.update();
    expect(trackerSpy).toHaveBeenLastCalledWith(
      expect.any(Function),
      expect.objectContaining(expectedCall)
    );
  });
  it('should call the widget tracking when the title is clicked without flavor', () => {
    const settings = {
      ...listProps.settings,
      titleLink: { href: PRENDETV_PROMO },
    };
    const trackerSpy = jest.spyOn(WidgetTracker, 'track');
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...listProps} settings={settings} />
      </Provider>
    );
    const widgetTitle = wrapper.find('WidgetTitle Link');
    act(() => {
      widgetTitle.simulate('click');
    });
    wrapper.update();
    expect(trackerSpy).not.toHaveBeenCalled();
  });
  it('should render white logo for Vix', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(true);
    const flavorProps = {
      ...listProps,
      settings: {
        ...listProps.settings,
        flavor: widgetFlavor.FLAVOR_PRENDE_TV,
      },
    };
    store.dispatch(setPageData({
      pageCategory: 'show',
    }));
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...flavorProps} />
      </Provider>
    );
    expect(wrapper.find('ListEnhancement__ButtonLinkWidget')).toHaveLength(1);
  });
  it('should have prop isWorldCupMvp', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement widgetContext={{ isWorldCupMVP: true }} />
      </Provider>
    );
    expect(wrapper.find('ListEnhancement').prop('widgetContext').isWorldCupMVP).toBe(true);
  });
  it('should have prop isWorldCupMvp on ListContainer ', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...listProps} widgetContext={{ isWorldCupMVP: true }} />
      </Provider>
    );
    expect(wrapper.find('ListContainer__ButtonWrapperStyled').prop('isWorldCupMvp')).toBe(true);
  });
  it('should have prop isWorldCupMvp FALSE on ListContainer ', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => false);
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...listProps} widgetContext={{ isWorldCupMVP: false }} />
      </Provider>
    );
    expect(wrapper.find('ListContainer__ButtonWrapperStyled').prop('isWorldCupMvp')).toBe(false);
  });
  it('should have the correct font if isWorldCupMvp is true', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...listProps} widgetContext={{ isWorldCupMVP: true }} />
      </Provider>
    );
    const buttonStyle = wrapper.find('TextUVN__TextStyled').last().children().getDOMNode();
    expect(getComputedStyle(buttonStyle).getPropertyValue('font-family')).toBe("'Roboto Flex',Helvetica,Arial,sans-serif");
  });
  it('should have isWorldCupMvp ButtonLinkWidget', () => {
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(true);
    features.deportes.isWorldCupMVP = jest.fn(() => true);

    const flavorProps = {
      ...listProps,
    };
    const settings = {
      ...listProps.settings,
      titleLink: { href: PRENDETV_PROMO },
      flavor: widgetFlavor.FLAVOR_PRENDE_TV,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ListEnhancement {...flavorProps} settings={settings} />
      </Provider>
    );
    const buttonStyle = wrapper.find('ListEnhancement__ButtonLinkWidget');
    expect(buttonStyle.prop('isWorldCupMVP')).toBe(true);
  });
});
