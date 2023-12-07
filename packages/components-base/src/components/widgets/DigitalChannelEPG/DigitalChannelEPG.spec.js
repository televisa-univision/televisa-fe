import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import * as videoUtil from '@univision/fe-commons/dist/utils/video';
import * as relativeUtil from '@univision/fe-utilities/helpers/url/toRelativeUrl';

import features from '@univision/fe-commons/dist/config/features';
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import * as selectors from '@univision/fe-commons/dist/store/selectors/page-selectors';

import mockData from '../../Epg/__mocks__/epg.json';

import DigitalChannelEPG from '.';

jest.useFakeTimers('modern');

const store = configureStore();
const commonProps = {
  device: 'desktop',
  settings: {},
  widgetContext: {},
};

/** @test {DigitalChannelEPG} */
describe('DigitalChannelEPG Spec', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.spyOn(features.widgets, 'isVixEnabled').mockReturnValue(false);
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><DigitalChannelEPG /></Provider>, div);
  });

  it('should not render if the content is not set correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DigitalChannelEPG content={[null]} />
      </Provider>
    );

    expect(wrapper.find('DigitalChannelEPG').first().html()).toBeFalsy();
  });

  it('should not render if there isn\'t any live show at the univision homepage', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DigitalChannelEPG content={mockData.contents} />
      </Provider>
    );
    expect(wrapper.find('ChannelStrip')).toHaveLength(1);
  });

  it('should refresh the show after one minute', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DigitalChannelEPG content={mockData.contents} />
      </Provider>
    );

    expect(wrapper.find('ChannelStrip')).toHaveLength(1);

    act(() => {
      const nextDay = new Date(new Date().getTime() + 86400000)
        .toLocaleString('en-US', { timeZone: 'America/New_York' });
      jest.spyOn(Date.prototype, 'toLocaleString').mockReturnValue(nextDay);
      jest.runTimersToTime(182000);
    });

    wrapper.update();
    expect(wrapper.find('ChannelStrip')).toHaveLength(1);
  });

  it('should render a channel strip', () => {
    const wrapper = mount(
      <Provider store={store}>
        <DigitalChannelEPG content={mockData.contents} />
      </Provider>
    );

    expect(wrapper.find('ChannelStrip')).toHaveLength(1);
  });

  it('should render a channel strip on any other noticias page', () => {
    const storeNoticias = configureStore({
      page: {
        data: {
          uri: 'http://www.univision.com/noticias/inmigrantes',
          type: 'section',
          vertical: 'Noticias',
        },
      },
    });

    const wrapper = mount(
      <Provider store={storeNoticias}>
        <DigitalChannelEPG content={mockData.contents} />
      </Provider>
    );

    expect(wrapper.find('ChannelStrip')).toHaveLength(1);
  });

  it('should not render a widget if homepage and not live', () => {
    jest.spyOn(videoUtil, 'getEPGSchedule').mockReturnValue({
      currentShow: null,
      nextShows: [],
    });
    const storeNoticias = configureStore({
      page: {
        data: {
          uri: 'http://www.univision.com/',
          type: 'section',
          vertical: 'Noticias',
        },
      },
    });

    const wrapper = mount(
      <Provider store={storeNoticias}>
        <DigitalChannelEPG content={mockData.contents} />
      </Provider>
    );

    expect(wrapper.find('ChannelStrip')).toHaveLength(0);
  });

  it('should render a channel card', () => {
    jest.spyOn(videoUtil, 'getEPGSchedule').mockReturnValue({
      currentShow: null,
      nextShows: [],
    });
    const storeNoticias = configureStore({
      page: {
        data: {
          uri: 'http://www.univision.com/noticias',
        },
      },
    });
    const wrapper = mount(
      <Provider store={storeNoticias}>
        <DigitalChannelEPG content={mockData.contents} {...commonProps} />
      </Provider>
    );
    // TODO: Revisar por que regresa sin contenido
    expect(wrapper.find('SingleWidget')).toHaveLength(0);
  });

  it('should render a channel strip on local page', () => {
    const storeNoticias = configureStore({
      page: {
        data: {
          type: 'section',
          vertical: 'Local',
        },
      },
    });

    const wrapper = mount(
      <Provider store={storeNoticias}>
        <DigitalChannelEPG content={mockData.contents} />
      </Provider>
    );

    expect(wrapper.find('ChannelStrip')).toHaveLength(1);
  });

  it('should render a channel card on local', () => {
    jest.spyOn(videoUtil, 'getEPGSchedule').mockReturnValue({
      currentShow: null,
      nextShows: [],
    });
    const storeLocal = configureStore({
      page: {
        data: {
          type: 'section',
          vertical: 'Local',
          uri: 'http://www.univision.com/local/city-name-code',
        },
      },
    });

    const newSettings = {
      ...commonProps,
      settings: { epgFlavor: '24-7-news' },
    };

    const wrapper = mount(
      <Provider store={storeLocal}>
        <DigitalChannelEPG content={mockData.contents} {...newSettings} />
      </Provider>
    );
    expect(wrapper.find('SingleWidget')).toHaveLength(0);
  });

  it('should render a channel card on TUDN', () => {
    jest.spyOn(selectors, 'isTudnSiteSelector').mockReturnValue(true);
    jest.spyOn(videoUtil, 'getEPGSchedule').mockReturnValue({
      currentShow: null,
      nextShows: [],
    });
    const storeLocal = configureStore({
      page: {
        data: {
          type: 'section',
          uri: 'https://www.tudn.com/',
        },
      },
    });

    const newSettings = {
      ...commonProps,
      settings: { epgFlavor: 'tudn' },
    };

    const wrapper = mount(
      <Provider store={storeLocal}>
        <DigitalChannelEPG content={mockData.contents} {...newSettings} />
      </Provider>
    );
    expect(wrapper.find('SingleWidget')).toHaveLength(0);
  });

  it('should render a SingleWidget when isTudn and isShowLive', () => {
    jest.spyOn(selectors, 'isTudnSiteSelector').mockReturnValue(true);
    jest.spyOn(videoUtil, 'getEPGSchedule').mockReturnValue({
      currentShow: {
        title: 'Noticias Univision 24/7',
        description: 'Noticias Univision 24/7',
        live: true,
        days: ['Monday', 'Thursday', 'Friday', 'Wednesday', 'Tuesday'],
        timeZone: 'America/New_York',
        startTime: '22:00',
        endTime: '23:00',
        day: 'Monday',
        displayTimezone: 'ET',
        startDate: '2023-09-25T11:00:00.000Z',
        easternDateStart: '25 Sep 2023 05:00:00 EDT',
        easternDateEnd: '25 Sep 2023 06:00:00 EDT',
        startTimeDisplay: '3AM',
        endTimeDisplay: '4AM',
      },
      nextShows: [],
    });

    const storeLocal = configureStore({
      page: {
        data: {
          type: 'section',
          uri: 'https://www.tudn.com/',
        },
      },
    });

    const newSettings = {
      ...commonProps,
      settings: { epgFlavor: 'tudn' },
    };

    const wrapper = mount(
      <Provider store={storeLocal}>
        <DigitalChannelEPG content={mockData.contents} {...newSettings} />
      </Provider>
    );
    expect(wrapper.find('SingleWidget')).toHaveLength(1);
  });

  it('should render a SingleWidget when isNoticiasHomePage and isShowLive', () => {
    jest.spyOn(videoUtil, 'getEPGSchedule').mockReturnValue({
      currentShow: {
        title: 'Noticias Univision 24/7',
        description: 'Noticias Univision 24/7',
        live: true,
        days: ['Monday', 'Thursday', 'Friday', 'Wednesday', 'Tuesday'],
        timeZone: 'America/New_York',
        startTime: '22:00',
        endTime: '23:00',
        day: 'Monday',
        displayTimezone: 'ET',
        startDate: '2023-09-25T11:00:00.000Z',
        easternDateStart: '25 Sep 2023 05:00:00 EDT',
        easternDateEnd: '25 Sep 2023 06:00:00 EDT',
        startTimeDisplay: '3AM',
        endTimeDisplay: '4AM',
      },
      nextShows: [],
    });
    jest.spyOn(relativeUtil, 'default').mockReturnValue('/noticias');
    const storeLocal = configureStore({
      page: {
        data: {
          type: 'section',
          uri: 'https://www.tudn.com/',
        },
      },
    });
    const newSettings = {
      ...commonProps,
      settings: { epgFlavor: 'tudn' },
    };
    const wrapper = mount(
      <Provider store={storeLocal}>
        <DigitalChannelEPG content={mockData.contents} {...newSettings} />
      </Provider>
    );
    expect(wrapper.find('SingleWidget')).toHaveLength(1);
  });
  it('should render a SingleWidget when isLocalesPage and isShowLive', () => {
    jest.spyOn(videoUtil, 'getEPGSchedule').mockReturnValue({
      currentShow: {
        title: 'Noticias Univision 24/7',
        description: 'Noticias Univision 24/7',
        live: true,
        days: ['Monday', 'Thursday', 'Friday', 'Wednesday', 'Tuesday'],
        timeZone: 'America/New_York',
        startTime: '22:00',
        endTime: '23:00',
        day: 'Monday',
        displayTimezone: 'ET',
        startDate: '2023-09-25T11:00:00.000Z',
        easternDateStart: '25 Sep 2023 05:00:00 EDT',
        easternDateEnd: '25 Sep 2023 06:00:00 EDT',
        startTimeDisplay: '3AM',
        endTimeDisplay: '4AM',
      },
      nextShows: [],
    });
    jest.spyOn(relativeUtil, 'default').mockReturnValue(['/local/']);
    const storeLocal = configureStore({
      page: {
        data: {
          type: 'section',
          uri: 'https://www.tudn.com/',
        },
      },
    });
    const newSettings = {
      ...commonProps,
      settings: { epgFlavor: 'tudn' },
    };
    const wrapper = mount(
      <Provider store={storeLocal}>
        <DigitalChannelEPG content={mockData.contents} {...newSettings} />
      </Provider>
    );
    expect(wrapper.find('SingleWidget')).toHaveLength(1);
  });
  it('should update currentShow when newID is different from oldId', () => {
    // Mock the getEPGSchedule function to return a different ID
    jest.spyOn(videoUtil, 'getEPGSchedule').mockReturnValue({
      currentShow: {
        title: 'Updated Show',
        easternDateStart: '26 Sep 2023 05:00:00 EDT',
      },
    });

    // Update Interval - 1 minute
    const UPDATE_INTERVAL = 60000;
    const wrapper = mount(
      <Provider store={store}>
        <DigitalChannelEPG content={mockData.contents} />
      </Provider>
    );
    act(() => {
      // Advance the timer to trigger the useInterval
      jest.runTimersToTime(UPDATE_INTERVAL);
    });
    wrapper.update();
  });
});
