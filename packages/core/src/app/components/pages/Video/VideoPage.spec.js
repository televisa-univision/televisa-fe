import React from 'react';
import { shallow } from 'enzyme';

import * as helpers from '@univision/fe-commons/dist/utils/helpers';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import Header from '@univision/fe-components-base/dist/components/Header';
import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import mockData from '@univision/fe-components-base/dist/components/widgets/CrossVerticalList/__mocks__/crossVerticalListMockData.json';

import VideoPage from './VideoPage';

jest.mock('@univision/fe-video/dist/components/VideoPlayer', () => jest.fn());
jest.mock('@univision/fe-components-base/dist/components/Header', () => jest.fn());
jest.mock('../../layout/MainWrapper', () => jest.fn());
jest.mock('@univision/fe-components-base/dist/components/widgets/WithWidgets', () => jest.fn(() => () => <div id="WithWidgets">mock</div>));

/** @test {Video} */
describe('VideoPage Spec', () => {
  let props;
  let getThemeSpy;

  beforeEach(() => {
    props = { page: { foo: 'bar' } };
    getThemeSpy = jest.spyOn(storeHelpers, 'getTheme').mockReturnValue({
      primary: '#0dbc56',
      secondary: '#009940',
      theme: 'emerald',
      variant: 'dark',
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should VideoPlayer', () => {
    const wrapper = shallow(<VideoPage {...props} />);
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
  });

  it('renders Header with logo', () => {
    jest.spyOn(helpers, 'exists').mockReturnValue(true);
    props.sourceStation = {
      logo: { foo: 'bar' },
    };
    const wrapper = shallow(<VideoPage {...props} />);
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should not show the dark variant if primaryTopic is noticias', () => {
    props.page.primaryTopic = 'noticias';
    props.variant = 'light';

    getThemeSpy.mockReturnValue({
      primary: '#2358bf',
      secondary: '#23a2ee',
      theme: 'blue',
      variant: 'light',
    });

    const wrapper = shallow(<VideoPage {...props} />);
    expect(wrapper.find(Header).prop('variant')).toEqual('light');
  });

  it('should render properly even without theme', () => {
    props.page.primaryTopic = 'noticias';
    props.variant = 'light';
    getThemeSpy.mockReturnValue(null);

    const wrapper = shallow(<VideoPage {...props} />);
    expect(wrapper.find(Header).prop('variant')).toBe('light');
  });

  it('should show the light variant if no props are passed', () => {
    const noPage = {};
    const expectedData = {
      fullWidth: true,
      variant: 'light',
    };
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    const wrapper = shallow(<VideoPage {...noPage} />);
    expect(wrapper.find(Header).prop('pageData')).toEqual(expectedData);
  });

  it('should show the dark variant when the theme has dark mode enabled', () => {
    getThemeSpy.mockReturnValue({
      primary: '#2358bf',
      secondary: '#23a2ee',
      isDark: true,
    });

    const wrapper = shallow(<VideoPage {...props} />);
    expect(wrapper.find(Header).prop('variant')).toBe('dark');
  });

  it('should render widgets block if widgets are returned', () => {
    const wrapper = shallow(<VideoPage {...props} />);

    /* unfortunately searching for more specific class / comp names
       would be better, but they didn't work - this did :) */
    expect(wrapper.find('.container').length).toEqual(1);
  });

  it('should not render widgets block if widgets are returned', () => {
    WithWidgets.mockReturnValueOnce(() => null);
    const wrapper = shallow(<VideoPage {...props} />);

    /* unfortunately searching for more specific class / comp names
       would be better, but they didn't work - this did :) */
    expect(wrapper.find('.container').length).toEqual(0);
  });

  it('should render widgets block  with cross vertical', () => {
    props.page.widgets = [mockData];
    const wrapper = shallow(<VideoPage {...props} />);

    /* unfortunately searching for more specific class / comp names
       would be better, but they didn't work - this did :) */
    expect(wrapper.find('.container').length).toEqual(2);
  });
});
