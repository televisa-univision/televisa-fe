/* eslint-disable no-underscore-dangle */
import React from 'react';
import { mount } from 'enzyme';

import * as gatsby from '@univision/fe-commons/dist/utils/loaders/gatsby';
import GatsbyInjector from '.';

describe('GatsbyComponent', () => {
  let props;
  let propsObj;
  beforeEach(() => {
    props = {
      params: 'path=%2Ffragments%2Fnoticias%2Ficij-video%2Fportada2.html&display=iframe&fullWidth=true&adSettings=%7B%22disable3rdPartyAds%22:false,%22disableAds%22:false,%22adTagValue%22:%22liveblog_test/testnavigationsection%22,%22targeting%22:%7B%22tag%22:%5B%22test%22%5D%7D,%22contentSpecificSettings%22:%7B%7D%7D&tracking=%7B%22content_id%22:%2200000161-4a05-d22d-af6d-ee87f74a0000%22,%22section_level1%22:%22test%20navigation%20section%22,%22title%22:%22test%20liveblog%22,%22content_type%22:%22liveblog%22,%22permalink%22:%22https://www.univision.com/test/test-liveblog%22,%22section_full_hierarchy%22:%5B%22test%20navigation%20section%22%5D,%22content_vertical%22:%22test%22,%22environment_name%22:%22prod%22%7D',
    };

    propsObj = {
      params: [{ prop: 'target', value: 'div' }, { prop: 'width', value: '100%' }, { prop: 'competition', value: '199' }, { prop: 'season', value: '2017' }, { prop: 'widget', value: 'team' }],
      path: '/external-content/test/opta-ranking.html',
    };
    jest.useFakeTimers();
    jest.restoreAllMocks();
  });

  it('Not render when there is only an object (params)', () => {
    const loadGatsby = jest.spyOn(gatsby, 'default');
    const wrapper = mount(<GatsbyInjector params={propsObj.params} />);
    expect(wrapper.find('.uvs-widget')).toHaveLength(0);
    loadGatsby.mockRestore();
  });

  it('render iframe GATSBY only params', async () => {
    const iframeSpy = jest.fn();
    global.window.PARAM = jest.fn();
    global.window.__gatsby_guid = jest.fn();
    global.window.GATSBY = { iframe: iframeSpy, init: jest.fn() };
    global.window.GET_PARAMS_FILTERED = jest.fn();
    jest.spyOn(gatsby, 'default').mockImplementation(() => Promise.resolve(global.window.GATSBY));
    mount(<GatsbyInjector {...props} />);
    jest.runAllTimers();
    await gatsby.default();
    expect(iframeSpy).toBeCalled();
  });

  it('render iframe GATSBY with path and params without minHeight', async () => {
    const iframeSpy = jest.fn();
    global.window.PARAM = jest.fn();
    global.window.__gatsby_guid = jest.fn();
    global.window.GATSBY = { iframe: iframeSpy, init: jest.fn() };
    global.window.GET_PARAMS_FILTERED = jest.fn();
    jest.spyOn(gatsby, 'default').mockImplementation(() => Promise.resolve(global.window.GATSBY));
    mount(<GatsbyInjector {...propsObj} />);
    jest.runAllTimers();
    await gatsby.default();
    expect(iframeSpy).toBeCalled();
  });

  it('render iframe GATSBY with path and params with minHeight', async () => {
    const iframeSpy = jest.fn();
    global.window.PARAM = jest.fn();
    global.window.__gatsby_guid = jest.fn();
    global.window.GATSBY = { iframe: iframeSpy, init: jest.fn() };
    global.window.GET_PARAMS_FILTERED = jest.fn();
    jest.spyOn(gatsby, 'default').mockImplementation(() => Promise.resolve(global.window.GATSBY));
    propsObj.minHeight = '100px';
    mount(<GatsbyInjector {...propsObj} />);
    jest.runAllTimers();
    await gatsby.default();
    expect(iframeSpy).toBeCalled();
  });

  it('should catch error of promise', () => {
    const error = new Error('Not Found');
    jest.spyOn(gatsby, 'default').mockImplementation(() => Promise.reject(error));
    const wrapper = mount(<GatsbyInjector {...props} />);
    jest.runAllTimers();
    expect(wrapper.instance().state).toBeDefined();
  });
});
