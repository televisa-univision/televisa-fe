import React from 'react';
import * as redux from 'react-redux';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import features from '@univision/fe-commons/dist/config/features';

import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';
import { ThemeProvider } from 'styled-components';
import mockData from './__mocks__/topQuickLinksData.json';
import TopQuickLinks from '.';

describe('TopQuickLinks', () => {
  jest.spyOn(redux, 'useSelector').mockImplementation(fn => fn());

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TopQuickLinks {...mockData} />, div);
  });
  it('should not render any items when contents array is empty', () => {
    const theme = { variant: 'light' };
    const props = {
      ...mockData,
      content: [],
    };
    jest.spyOn(selectors, 'themeSelector').mockReturnValue(theme);
    const wrapper = mount(
      <ThemeProvider theme={theme}><TopQuickLinks {...props} /></ThemeProvider>
    );
    expect(wrapper.find('.uvs-container')).toHaveLength(0);
    expect(wrapper.find('TopQuickLinks__LinkListItem')).toHaveLength(0);
  });
  it('should track link clicks', () => {
    const trackerSpy = jest.spyOn(Tracker, 'fireEvent');
    const theme = { variant: 'dark' };
    jest.spyOn(selectors, 'themeSelector').mockReturnValue(theme);
    const wrapper = mount(
      <ThemeProvider theme={theme}><TopQuickLinks {...mockData} /></ThemeProvider>
    );

    wrapper.find('Link').first().simulate('click');

    expect(trackerSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        engagement_details: 'this title is shorter',
        event: 'navigation_click',
        event_action: 'topnav-header-quicklinks',
      })
    );
  });
  it('should have isWorldCupMVP with theme light', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const theme = { variant: 'light' };
    const wrapper = mount(
      <ThemeProvider theme={theme}>
        <TopQuickLinks {...mockData} />
      </ThemeProvider>
    );
    const container = wrapper.find('TopQuickLinks__Container');
    expect(container.prop('isWorldCupMVP')).toBe(true);
  });
});
