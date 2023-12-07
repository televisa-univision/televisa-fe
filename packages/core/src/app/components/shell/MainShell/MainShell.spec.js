import React from 'react';
import { mount, shallow } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import localization from '@univision/fe-commons/dist/utils/localization/LocalizationManager';
import mockApiData from 'server/proxy/api/page/__mocks__/mockPageApiData.json';
import MainShell from './MainShell';

/**
 * Mock page content to be wrapped by the {MainShell }
 * @type {JSX}
 */
const page = <div className="mock-page" />;

const LUX = {
  addData: jest.fn(),
};

/**
 * Mock of the webpack bundle's assets object
 * @type {{javascript: {main: string}, styles: {main: string}}}
 */
const assets = {
  styles: 'section.css',
  javascript: 'section.js',
};

let wrapper;

/** @test {MainShell } */
describe('MainShell  Spec', () => {
  beforeAll(() => {
    storeHelpers.isVerticalHome = jest.fn();
    storeHelpers.getInitialState = jest.fn(() => ({
      data: {},
    }));
  });

  beforeEach(() => {
    // Suppress warnings in console for this spec
    // Mounting the MainShell  creates a warning that isn't an issue when running the app
    /* eslint-disable no-console */
    console.error = jest.fn();
    wrapper = mount(
      <MainShell
        assets={assets}
        initialState={mockApiData.data}
        isSpa={false}
        page={page}
      />
    );
  });

  afterAll(() => {
    storeHelpers.isVerticalHome.mockReset();
    storeHelpers.getInitialState.mockReset();
  });

  it('should render a body tag', () => {
    const body = wrapper.find('body');
    expect(body).toBeDefined();
  });

  it('should load  a script that exports the initial state to the window', () => {
    const script = wrapper.find('script#initial-state');
    expect(script).toBeDefined();
    expect(script.text()).toMatch(/window.__INITIAL_STATE__ =/);
  });

  it('should load inlineCss when assets.inlineCss exists', () => {
    window.LUX = LUX;
    assets.inlineCss = 'styles';
    wrapper = shallow(
      <MainShell
        assets={assets}
        initialState={mockApiData.data}
        isSpa={false}
        page={page}
      />
    );
    const inlineStyles = wrapper.find('style');
    expect(inlineStyles).toBeDefined();
  });

  it('should have app-spa className when isSpa is true', () => {
    window.LUX = LUX;
    wrapper = shallow(
      <MainShell
        assets={assets}
        initialState={mockApiData.data}
        isSpa
        page={page}
      />
    );
    const appSpa = wrapper.find('.app-spa');
    expect(appSpa).toBeDefined();
  });

  it('should have correct languange on html tag', () => {
    localization.getCurrentLanguage = jest.fn(() => 'es');
    wrapper = shallow(
      <MainShell
        assets={assets}
        initialState={mockApiData.data}
        isSpa
        page={page}
      />
    );
    const htmlElem = wrapper.find('html');
    expect(htmlElem.props().lang).toBe('es');
  });
});
