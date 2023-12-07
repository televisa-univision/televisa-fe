import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import configureStore from '@univision/fe-commons/dist/store/configureStore';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import fetchGraphQL from '@univision/fe-commons/dist/utils/api/graphql';
import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import QuickApply from './index';

const store = configureStore();

/**
 * Wait for async behaviours to finish
 * @param {Object} wrapper component
 * @param {function} _actions any actions to be triggered
 * @returns {Promise<void>}
 */
const actions = async (wrapper, _actions) => {
  await act(async () => {
    await (new Promise(resolve => setTimeout(resolve, 0)));
    if (_actions) _actions();
    wrapper.update();
  });
};

jest.mock('@univision/fe-commons/dist/utils/api/graphql', () => jest.fn());

const user = {
  firstName: 'User',
  lastName: 'Test',
  email: 'foo@gmail.com',
  phoneNumber: '867274676',
  resumeFileName: 'resume.pdf',
};

const file = new File(
  ['data:application/pdf;base64,JW44Y4YG4Y'],
  user.resumeFileName, { type: 'application/pdf' }
);

describe('Quick Apply component', () => {
  beforeEach(() => {
    store.dispatch(setPageData({
      config: { graphql: '' },
    }));
  });

  afterEach(() => {
    LocalStorage.remove('apploiToken');
  });

  it('should render quick apply', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: false },
      getApploiUser: {
        firstName: '', lastName: '', email: '', phone: '', resumeFileName: user.resumeFileName,
      },
      quickApply: { token: 'dummy' },
    }));
    LocalStorage.setObject('apploiToken', 'foo');
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="23445234" partner={{}} utmSource="univision-mobile-web" label="Quick Apply" language="en" />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('QuickApply__Title').text()).toEqual('Quick Apply');

    act(() => {
      wrapper.find('QuickApply__InputFile').simulate('change', { target: { files: [file] } });
    });

    await actions(wrapper);

    act(() => {
      wrapper.find('InputField__Input#firstName').simulate('change', { target: { value: user.firstName, name: 'firstName' } });
      wrapper.find('InputField__Input#lastName').simulate('change', { target: { value: user.lastName, name: 'lastName' } });
      wrapper.find('InputField__Input#email').simulate('change', { target: { value: user.email, name: 'email' } });
      wrapper.find('InputField__Input#phone').simulate('change', { target: { value: user.phoneNumber, name: 'phone' } });
      wrapper.find('InputField__Input#phone').simulate('change', { target: { value: '' } });
      wrapper.find('CheckboxComponent__CheckboxInput').simulate('change', { target: { checked: true, name: 'checkbox' } });
    });

    wrapper.update();

    expect(wrapper.find('QuickApply__Text').text()).toEqual(user.resumeFileName);

    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: true },
      getApploiUser: {
        firstName: '', lastName: '', email: '', phone: '', resumeFileName: user.resumeFileName,
      },
      quickApply: { token: 'dummy' },
    }));

    act(() => {
      wrapper.find('QuickApply__Button').simulate('click');
    });

    await actions(wrapper);

    const printTitles = wrapper.find('PrintComponent__TitlePrint');
    const printValue = wrapper.find('PrintComponent__TextPrint');

    expect(wrapper).toBeDefined();
    expect('Print').toBeDefined();
    expect(wrapper.find('QuickApply__Title > span').text()).toEqual('applied');
    expect(printTitles).toHaveLength(4);
    expect(printTitles.at(0).text()).toEqual('First Name:');
    expect(printTitles.at(1).text()).toEqual('Last Name:');
    expect(printTitles.at(2).text()).toEqual('Email:');
    expect(printTitles.at(3).text()).toEqual('Phone:');
    expect(printValue.at(0).text()).toEqual(user.firstName);
    expect(printValue.at(1).text()).toEqual(user.lastName);
    expect(printValue.at(2).text()).toEqual(user.email);
    expect(printValue.at(3).text()).toEqual(user.phoneNumber);

    act(() => {
      // clear form
      wrapper.find('QuickApply__ClickHere').simulate('click');
    });
    wrapper.update();

    expect(wrapper.find('QuickApply__Text').text()).toEqual('attachResume (Optional)');

    act(() => {
      wrapper.find('QuickApply__Text').simulate('click', { target: { files: [file] } });
      wrapper.find('QuickApply__InputFile').simulate('change', { target: { files: [file] } });
    });

    wrapper.update();

    act(() => {
      // removes upload resume file
      wrapper.find('QuickApply__Clear').simulate('click');
    });

    wrapper.update();

    expect(wrapper.find('QuickApply__Title').text()).toEqual('Quick Apply');
    expect(wrapper.find('InputField__Input#firstName').text()).toEqual('');
    expect(wrapper.find('InputField__Input#lastName').text()).toEqual('');
    expect(wrapper.find('InputField__Input#email').text()).toEqual('');
    expect(wrapper.find('InputField__Input#phone').text()).toEqual('');
    expect('QuickApply__Button').toBeDefined();
  });

  it('test email validation', async () => {
    LocalStorage.setObject('apploiToken', 'foo');
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: false },
      getApploiUser: { email: 'wrong-email' },
    }));

    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="23445234" partner={{}} utmSource="univision-mobile-web" />
      </Provider>
    );

    await actions(wrapper);

    act(() => {
      wrapper.find('InputField__Input#email').simulate('focus');
      wrapper.find('InputField__Input#email').simulate('blur');
    });

    wrapper.update();

    expect(wrapper).toBeDefined();
    expect(wrapper.find('InputField__Message').text()).toEqual('Error: invalid email');

    act(() => {
      wrapper.find('InputField__Input#email').simulate('change', { target: { value: user.email, name: 'email' } });
    });

    wrapper.update();

    act(() => {
      wrapper.find('InputField__Input#email').simulate('focus');
      wrapper.find('InputField__Input#email').simulate('blur');
    });

    wrapper.update();

    expect(wrapper.find('InputField__Message')).toHaveLength(0);
  });

  it('should render quick apply throws error - job application status', async () => {
    const clientLoggingSpy = jest.spyOn(clientLogging, 'default').mockReturnValue(null);
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: null,
      getApploiUser: user,
      quickApply: { token: 'dummy' },
    }));
    LocalStorage.setObject('apploiToken', 'foo');
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="23445234" partner={{}} utmSource="univision-mobile-web" />
      </Provider>
    );

    await actions(wrapper);
    expect(clientLoggingSpy).toHaveBeenCalled();
  });

  it('should render quick apply throws error - quick apply request', async () => {
    const clientLoggingSpy = jest.spyOn(clientLogging, 'default').mockReturnValue(null);
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: false },
      getApploiUser: user,
      quickApply: null,
    }));
    LocalStorage.setObject('apploiToken', 'foo');
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="23445234" partner={{}} utmSource="univision-mobile-web" />
      </Provider>
    );

    await actions(wrapper);

    act(() => {
      wrapper.find('CheckboxComponent__CheckboxInput').simulate('change', { target: { checked: true, name: 'checkbox' } });
    });

    wrapper.update();

    act(() => {
      wrapper.find('QuickApply__Button').simulate('click');
    });

    await actions(wrapper);

    expect(clientLoggingSpy).toHaveBeenCalled();
  });

  it('should render quick apply throws error - quick apploi user', async () => {
    const clientLoggingSpy = jest.spyOn(clientLogging, 'default').mockReturnValue(null);
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: false },
      getApploiUser: null,
      quickApply: { token: 'dummy' },
    }));
    LocalStorage.setObject('apploiToken', 'foo');
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="23445234" partner={{}} utmSource="univision-mobile-web" />
      </Provider>
    );

    await actions(wrapper);

    expect(clientLoggingSpy).toHaveBeenCalled();
  });

  it('hit upload file and not select file', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: false },
      getApploiUser: {
        firstName: '', lastName: '', email: '', phone: '', resumeFileName: '',
      },
      quickApply: { token: 'dummy' },
    }));
    LocalStorage.setObject('apploiToken', 'foo');
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="23445234" partner={{}} utmSource="univision-mobile-web" />
      </Provider>
    );

    await actions(wrapper);

    act(() => {
      wrapper.find('QuickApply__InputFile').simulate('change', { target: { files: [] } });
    });

    await actions(wrapper);

    expect(wrapper.find('QuickApply__Text').text()).toEqual('attachResume (Opcional)');
  });

  it('should render quick apply already applied', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: true },
      getApploiUser: user,
      jobQuickApply: { token: 'dummy' },
    }));
    LocalStorage.setObject('apploiToken', 'foo');
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="141255" partner={{}} utmSource="univision-web" />
      </Provider>
    );

    await actions(wrapper);

    const printTitles = wrapper.find('PrintComponent__TitlePrint');
    const printValue = wrapper.find('PrintComponent__TextPrint');

    expect(wrapper).toBeDefined();
    expect('Print').toBeDefined();
    expect(wrapper.find('QuickApply__Title > span').text()).toEqual('applied');
    expect(printTitles).toHaveLength(4);
    expect(printTitles.at(0).text()).toEqual('First Name:');
    expect(printTitles.at(1).text()).toEqual('Last Name:');
    expect(printTitles.at(2).text()).toEqual('Email:');
    expect(printTitles.at(3).text()).toEqual('Phone:');
    expect(printValue.at(0).text()).toEqual(user.firstName);
    expect(printValue.at(1).text()).toEqual(user.lastName);
    expect(printValue.at(2).text()).toEqual(user.email);
    expect(printValue.at(3).text()).toEqual(user.phoneNumber);
    expect(printValue.at(4).text()).toEqual(user.resumeFileName);
  });

  it('should render quick apply with no token', () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: false },
      getApploiUser: user,
      jobQuickApply: { token: null },
    }));
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="141255" partner={{}} utmSource="univision-web" />
      </Provider>
    );

    expect(wrapper).toBeDefined();
  });

  it('should render quick apply with required label', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: false },
      getApploiUser: {
        firstName: '', lastName: '', email: '', phone: '', resumeFileName: '',
      },
      quickApply: { token: 'dummy' },
    }));
    LocalStorage.setObject('apploiToken', 'foo');
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="23445234" partner={{}} utmSource="univision-mobile-web" language="es" resumeRequired />
      </Provider>
    );

    await actions(wrapper);

    expect(wrapper.find('QuickApply__Text').text()).toEqual('attachResume (Requerido)');
  });

  it('should render quick apply with required label and attached filename', async () => {
    fetchGraphQL.mockImplementation(() => Promise.resolve({
      getJobApplicationStatus: { alreadyApplied: false },
      getApploiUser: {
        firstName: '', lastName: '', email: '', phone: '', resumeFileName: user.resumeFileName,
      },
      quickApply: { token: 'dummy' },
    }));
    LocalStorage.setObject('apploiToken', 'foo');
    const wrapper = mount(
      <Provider store={store}>
        <QuickApply id="23445234" partner={{}} utmSource="univision-mobile-web" label="Quick Apply" language="en" resumeRequired />
      </Provider>
    );

    await actions(wrapper);

    act(() => {
      wrapper.find('QuickApply__InputFile').simulate('change', { target: { files: [file] } });
    });

    await actions(wrapper);

    act(() => {
      wrapper.find('InputField__Input#firstName').simulate('change', { target: { value: user.firstName, name: 'firstName' } });
      wrapper.find('InputField__Input#lastName').simulate('change', { target: { value: user.lastName, name: 'lastName' } });
      wrapper.find('InputField__Input#email').simulate('change', { target: { value: user.email, name: 'email' } });
      wrapper.find('InputField__Input#phone').simulate('change', { target: { value: user.phoneNumber, name: 'phone' } });
      wrapper.find('InputField__Input#phone').simulate('change', { target: { value: '' } });
      wrapper.find('CheckboxComponent__CheckboxInput').simulate('change', { target: { checked: true, name: 'checkbox' } });
    });

    wrapper.update();

    expect(wrapper.find('QuickApply__Text').text()).toEqual(user.resumeFileName);

    await actions(wrapper);
  });
});
