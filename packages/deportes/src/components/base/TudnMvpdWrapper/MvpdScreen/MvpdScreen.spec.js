import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import MvpdScreen from '.';

const store = configureStore();

store.dispatch(setPageData({
  domain: 'tudn.com',
}));

const mockEvent = {
  preventDefault: jest.fn(),
};

const settings = {
  titleNoTudnXtra: '',
  titleNoTudn: '',
  descriptionNoTudnXtra: '',
  descriptionNoTudn: '',
};

describe('MvpdScreenComponent', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render WelcomeScreen correctly', () => {
    const wrapper = mount(<MvpdScreen />);
    expect(wrapper.find('MvpdScreen__MainWrapper')).toHaveLength(1);
  });

  it('should render WelcomeScreen and trigger close', () => {
    const closeSpy = jest.fn();
    const wrapper = mount(<MvpdScreen
      close={closeSpy}
      isXtra={false}
      tudnXtraSettings={settings}
    />);
    wrapper.find('TudnPopupScreen').at(0).props().closeFunc(mockEvent);
    expect(wrapper.find('MvpdScreen__MainWrapper')).toHaveLength(1);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should render WelcomeScreen and not trigger close if is not a valid function', () => {
    const closeSpy = jest.fn();
    const wrapper = mount(<MvpdScreen isXtra />);
    expect(wrapper.find('MvpdScreen__MainWrapper')).toHaveLength(1);
    wrapper.find('TudnPopupScreen').at(0).props().closeFunc(mockEvent);
    expect(closeSpy).not.toHaveBeenCalled();
  });
  it('should render custom text', () => {
    settings.titleNoTudnXtra = 'title';
    settings.descriptionNoTudnXtra = 'description';
    const wrapper = mount(<MvpdScreen isXtra tudnXtraSettings={settings} channels={{ es: ['tudnxtra'], en: ['tudnxtra'] }} />);
    expect(wrapper.find('MvpdScreen__MainWrapper')).toHaveLength(1);
    expect(wrapper.find('TudnPopupScreen').at(0).props().text).toBe('description');
    expect(wrapper.find('TudnPopupScreen').at(0).props().title).toBe('title');
  });
  it('should set current language to es when close if in en language', () => {
    store.dispatch(setPageData({
      language: 'en',
    }));
    const closeSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MvpdScreen
          close={closeSpy}
          isXtra
          tudnXtraSettings={settings}
        />
      </Provider>
    );
    wrapper.find('TudnPopupScreen').at(0).props().closeFunc(mockEvent);
    expect(wrapper.find('MvpdScreen__MainWrapper')).toHaveLength(1);
    expect(closeSpy).toHaveBeenCalled();
    expect(store.getState().page).toEqual(expect.objectContaining({ language: 'es' }));
  });
});
