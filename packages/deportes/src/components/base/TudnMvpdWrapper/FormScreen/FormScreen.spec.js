import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import localStorage from '@univision/fe-utilities/storage/localStorage';
import sessionStorage from '@univision/fe-utilities/storage/sessionStorage';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import FormScreen from '.';

const store = configureStore();

store.dispatch(setPageData({
  domain: 'tudn.com',
}));

const mockEvent = {
  preventDefault: jest.fn(),
  nativeEvent: {},
};
mockEvent.nativeEvent = mockEvent;

const settings = {
  titleProviderNoTudnXtra: '',
  descriptionProviderNoTudnXtra: '',
};

describe('FormScreen component', () => {
  beforeEach(() => {
    sessionStorage.clear();
    localStorage.clear();
  });
  afterAll(() => {
    jest.restoreAllMocks();
    sessionStorage.clear();
    localStorage.clear();
  });

  it('should render FormScreen correctly', () => {
    const wrapper = mount(<FormScreen />);
    expect(wrapper.find('FormScreen__MainWrapper')).toHaveLength(1);
  });

  it('should render FormScreen correctly with device data', () => {
    const wrapper = mount(<FormScreen device="mobile" />);
    expect(wrapper.find('FormScreen__MainWrapper')).toHaveLength(1);
    expect(wrapper.instance().isMobile).toBe(true);
  });

  it('should render FormScreen and trigger close', () => {
    const closeSpy = jest.fn();
    const wrapper = mount(<FormScreen close={closeSpy} tudnXtraSettings={settings} />);
    wrapper.find('SubscriptionForm').at(0).props().closeFunc(mockEvent);
    expect(wrapper.find('FormScreen__MainWrapper')).toHaveLength(1);
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should render FormScreen and not trigger close if is not a valid function', () => {
    settings.titleProviderNoTudnXtra = 'something';
    settings.descriptionProviderNoTudnXtra = 'something else';
    const closeSpy = jest.fn();
    const wrapper = mount(<FormScreen tudnXtraSettings={settings} />);
    expect(wrapper.find('FormScreen__MainWrapper')).toHaveLength(1);
    wrapper.find('SubscriptionForm').at(0).props().closeFunc(mockEvent);
    expect(closeSpy).not.toHaveBeenCalled();
  });
  it('should render FormScreen and trigger close and fire mvpd track event', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const closeSpy = jest.fn();
    localStorage.set('hasFormSubmitted', true);
    sessionStorage.setObject('mvpdData', { providerName: 'DISH' });
    const wrapper = mount(<FormScreen close={closeSpy} />);
    wrapper.find('SubscriptionForm').at(0).props().closeFunc(mockEvent);
    expect(trackerSpy).toHaveBeenLastCalledWith(expect.any(Object));
    expect(closeSpy).toHaveBeenCalled();
  });
  it('should call handle input on name change', () => {
    const inputHandlerSpy = jest.spyOn(FormScreen.prototype, 'handleInputChange');
    const wrapper = mount(<FormScreen />);
    const input = wrapper.find('input').at(0);

    input.instance().value = 'hello';
    input.simulate('change');
    expect(wrapper.state('name')).toEqual('hello');
    expect(inputHandlerSpy).toHaveBeenCalledTimes(1);

    inputHandlerSpy.mockRestore();
  });
  it('should call handle input on email change', () => {
    const inputHandlerSpy = jest.spyOn(FormScreen.prototype, 'handleInputChange');
    const wrapper = mount(<FormScreen />);
    const input = wrapper.find('input').at(1);

    input.instance().value = 'email@email.com';
    input.simulate('change');
    expect(wrapper.state('email')).toEqual('email@email.com');
    expect(inputHandlerSpy).toHaveBeenCalledTimes(1);

    inputHandlerSpy.mockRestore();
  });
  it('should call handle input on checkbox change', () => {
    const inputHandlerSpy = jest.spyOn(FormScreen.prototype, 'handleInputChange');
    const wrapper = mount(<FormScreen />);
    const input = wrapper.find('input').at(2);

    input.instance().checked = true;
    input.simulate('change');
    expect(wrapper.state('agree')).toEqual(true);
    expect(inputHandlerSpy).toHaveBeenCalledTimes(1);

    inputHandlerSpy.mockRestore();
  });
  it('should call handle error on submit and not request submit if errors are present', () => {
    const errorHandlerSpy = jest.spyOn(FormScreen.prototype, 'handleError');
    const submitHandlerSpy = jest.spyOn(FormScreen.prototype, 'handleSubmit');
    const requestHandlerSpy = jest.spyOn(FormScreen.prototype, 'requestSubmit');
    const wrapper = mount(<FormScreen />);

    wrapper.find('SubscriptionForm').at(0).props().onPress(mockEvent);

    expect(submitHandlerSpy).toHaveBeenCalledTimes(1);
    expect(errorHandlerSpy).toHaveBeenCalledTimes(1);
    expect(requestHandlerSpy).not.toHaveBeenCalled();
    expect(wrapper.state('nameError')).toEqual(true);
    expect(wrapper.state('policyError')).toEqual(true);
    expect(wrapper.state('emailError')).toEqual(true);
    errorHandlerSpy.mockRestore();
    submitHandlerSpy.mockRestore();
    requestHandlerSpy.mockRestore();
  });
  it('should call handleError if submit hs failed', () => {
    const inputHandlerSpy = jest.spyOn(FormScreen.prototype, 'handleInputChange');
    const errorHandlerSpy = jest.spyOn(FormScreen.prototype, 'handleError');
    const wrapper = mount(<FormScreen />);
    wrapper.find('SubscriptionForm').at(0).props().onPress(mockEvent);
    expect(wrapper.state('nameError')).toEqual(true);
    const input = wrapper.find('input').at(0);

    input.instance().value = 'name last';
    input.simulate('change');
    expect(wrapper.state('name')).toEqual('name last');
    expect(inputHandlerSpy).toHaveBeenCalledTimes(1);
    expect(errorHandlerSpy).toHaveBeenCalledTimes(2);
    expect(wrapper.state('nameError')).toEqual(false);
    inputHandlerSpy.mockRestore();
  });
  it('should fetch POST data when server returns a successful response', (done) => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      ok: true,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    sessionStorage.setObject('mvpdData', { providerName: 'Xfinity' });

    const wrapper = mount(<FormScreen device="desktop" />);
    const input = wrapper.find('input').at(0);
    input.instance().value = 'hello there';
    input.simulate('change');
    const input2 = wrapper.find('input').at(1);
    input2.instance().value = 'email@email.com';
    input2.simulate('change');
    const input3 = wrapper.find('input').at(2);
    input3.instance().checked = true;
    input3.simulate('change');

    wrapper.find('SubscriptionForm').at(0).props().onPress(mockEvent);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://pub.s7.exacttarget.com/3yni3byng01',
      {
        body: JSON.stringify({
          nombre: 'hello there',
          correo: 'email@email.com',
          mvpd: 'Xfinity',
          platform: 'web-desktop',
        }),
        method: 'POST',
      });

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        agree: true,
        email: 'email@email.com',
        emailError: false,
        hasErrorForm: false,
        name: 'hello there',
        nameError: false,
        policyError: false,
        success: true,
      });

      global.fetch.mockClear();
      sessionStorage.clear();
      done();
    });
  });
  it('should handles fetch exception gracefully', (done) => {
    const error = new Error('Not Found');
    const mockFetchPromise = Promise.reject(error);
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = mount(<FormScreen />);
    const input = wrapper.find('input').at(0);
    input.instance().value = 'hello there';
    input.simulate('change');
    const input2 = wrapper.find('input').at(1);
    input2.instance().value = 'email@email.com';
    input2.simulate('change');
    const input3 = wrapper.find('input').at(2);
    input3.instance().checked = true;
    input3.simulate('change');

    wrapper.find('SubscriptionForm').at(0).props().onPress(mockEvent);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://pub.s7.exacttarget.com/3yni3byng01',
      {
        body: JSON.stringify({
          nombre: 'hello there',
          correo: 'email@email.com',
          mvpd: 'Not Available',
          platform: 'web-na',
        }),
        method: 'POST',
      });

    process.nextTick(() => {
      expect(wrapper.state('success')).toEqual(false);
      expect(wrapper.state('hasErrorForm')).toEqual(true);

      global.fetch.mockClear();
      done();
    });
  });

  it('should set current language to es if close form en language', () => {
    store.dispatch(setPageData({
      language: 'en',
    }));
    const closeSpy = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <FormScreen close={closeSpy} tudnXtraSettings={settings} />
      </Provider>
    );
    wrapper.find('SubscriptionForm').at(0).props().closeFunc(mockEvent);
    expect(wrapper.find('FormScreen__MainWrapper')).toHaveLength(1);
    expect(closeSpy).toHaveBeenCalled();
    expect(store.getState().page).toEqual(expect.objectContaining({ language: 'es' }));
  });
});
