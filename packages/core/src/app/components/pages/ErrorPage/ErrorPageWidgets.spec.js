import React from 'react';
import ReactDOM from 'react-dom';
import * as reactRedux from 'react-redux';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import * as fetch from '@univision/fe-commons/dist/utils/api/content/fetch';
import * as clientLogging from '@univision/fe-commons/dist/utils/logging/clientLogging';

import * as widgetFactory from '../../../utils/factories/widgetFactory';

import ErrorPageWidgets from './ErrorPageWidgets';

/** @test {ErrorPageWidgets} */
describe('ErrorPageWidgets Spec', () => {
  const fetchResponse = { content: 'test' };

  let fetchSpy;
  let useDispatchSpy;
  let useSelectorSpy;
  let parseWidgetsSpy;
  let clientLoggingSpy;

  beforeEach(() => {
    fetchSpy = jest.spyOn(fetch, 'default').mockImplementation(() => fetchResponse);
    useSelectorSpy = jest.spyOn(reactRedux, 'useSelector').mockImplementation(jest.fn());
    useDispatchSpy = jest.spyOn(reactRedux, 'useDispatch').mockImplementation(() => jest.fn());
    parseWidgetsSpy = jest.spyOn(widgetFactory, 'parseWidgets').mockImplementation(jest.fn());
    clientLoggingSpy = jest.spyOn(clientLogging, 'default').mockImplementation(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ErrorPageWidgets />, div);

    expect(useSelectorSpy).toHaveBeenCalled();
  });

  it('should call the fetch and render widgets', async () => {
    useSelectorSpy.mockImplementation(() => 'test');
    parseWidgetsSpy.mockReturnValue([
      <div key="test">test</div>,
    ]);

    await act(async () => {
      const wrapper = await mount(<ErrorPageWidgets />);
      wrapper.update();
    });

    expect(fetchSpy).toHaveBeenCalled();
    expect(useDispatchSpy).toHaveBeenCalled();
    expect(parseWidgetsSpy).toHaveBeenCalled();
  });

  it('should catch and log the fetch error', async () => {
    useSelectorSpy.mockImplementation(() => 'test');
    fetchSpy.mockImplementation(() => { throw new Error('test'); });

    await act(async () => {
      const wrapper = await mount(<ErrorPageWidgets />);
      wrapper.update();
    });

    expect(fetchSpy).toHaveBeenCalled();
    expect(clientLoggingSpy).toHaveBeenCalled();
  });
});
