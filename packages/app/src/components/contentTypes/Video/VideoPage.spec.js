import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';

import WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import VideoPlayer from '@univision/fe-video/dist/components/VideoPlayer';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import { DEPORTES_SCORE_CELLS } from '@univision/fe-commons/dist/constants/widgetTypes';

import VideoPage from '.';

const store = configureStore();

jest.mock('@univision/fe-video/dist/components/VideoPlayer', () => jest.fn(() => () => <div>mock</div>));
jest.mock('@univision/fe-components-base/dist/components/widgets/WithWidgets', () => jest.fn(() => () => <div id="WithWidgets">mock</div>));

/** @test {Video} */
describe('VideoPage Spec', () => {
  let props;

  beforeEach(() => {
    props = {
      pageData: {
        data: {
          type: 'video',
        },
        theme: {
          primary: '#0dbc56',
          secondary: '#009940',
          theme: 'emerald',
          variant: 'dark',
        },
      },
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should VideoPlayer', () => {
    const wrapper = shallow(<VideoPage {...props} />);
    expect(wrapper.find(VideoPlayer)).toHaveLength(1);
  });

  it('should show the light variant by default', () => {
    // eslint-disable-next-line no-console
    console.error = jest.fn();
    delete props.pageData.theme;
    const wrapper = mount(
      <Provider store={store}>
        <VideoPage {...props} />
      </Provider>,
    );
    expect(wrapper.find('Video__VideoWrapper')).toHaveStyleRule('background-color', '#ffffff');
  });

  it('should show the dark variant when the theme has dark mode enabled', () => {
    const propsWithDarkTheme = {
      ...props,
    };
    propsWithDarkTheme.pageData.theme.isDark = true;
    const wrapper = mount(
      <Provider store={store}>
        <VideoPage {...propsWithDarkTheme} />
      </Provider>,
    );
    expect(wrapper.find('Video__VideoWrapper')).toHaveStyleRule('background-color', '#181818');
  });

  it('should render widgets block if widgets are returned', () => {
    const wrapper = shallow(<VideoPage {...props} />);

    /* unfortunately searching for more specific class / comp names
       would be better, but they didn't work - this did :) */
    expect(wrapper.find('.container').length).toEqual(2);
  });

  it('should not render widgets block if widgets are returned', () => {
    WithWidgets.mockReturnValueOnce(() => null);
    const wrapper = shallow(<VideoPage {...props} />);

    /* unfortunately searching for more specific class / comp names
       would be better, but they didn't work - this did :) */
    expect(wrapper.find('.container').length).toEqual(1);
  });
  it('should dont render widget scorecell', () => {
    const propsWithScorecellWidget = {
      ...props,
    };
    propsWithScorecellWidget.pageData.data.widgets = [
      {
        type: DEPORTES_SCORE_CELLS,
        contents: [],
      },
    ];
    const wrapper = shallow(<VideoPage {...propsWithScorecellWidget} />);
    expect(wrapper.find('.row').length).toEqual(2);
  });
  it('should render widget scorecell', () => {
    const propsWithScorecellWidget = {
      ...props,
    };
    propsWithScorecellWidget.pageData.data.widgets = [
      {
        type: DEPORTES_SCORE_CELLS,
        contents: [
          {
            scorecell: 'soccermatch1',
          },
          {
            scorecell: 'soccermarch2',
          },
        ],
      },
    ];
    propsWithScorecellWidget.pageData.data.parent = {
      name: 'liga mx',
      title: 'Liga MX',
    };
    propsWithScorecellWidget.pageData.data.userLocation = 'MX';
    const wrapper = shallow(<VideoPage {...propsWithScorecellWidget} />);
    expect(wrapper.find('Video__ScorecellRow').length).toEqual(1);
  });
});
