import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import NotificationBanner from '.';
import Styles from './NotificationBanner.scss';

jest.useFakeTimers();

/**
 * Mocked content items for test
 * @type {Object}
 */
const contentItems = {
  type: 'GenericWidgetModule',
  name: '',
  id: '',
  settings: {
    nativeAd: {
      active: false,
      position: 2,
    },
    title: 'Clientes de Verizon',
    titleLink: {
      uid: '0000015f-54fc-d640-a7df-fefdbece0001',
      uri: null,
      type: 'externallink',
      versionCreated: null,
      text: null,
      href: 'http://www.univision.com/devuelvemeunivision',
      target: '_blank',
    },
    genericWidget: {
      type: 'NotificationBanner',
      settings: null,
    },
  },
  contents: [
    {
      uid: '0000015f-3629-d049-a55f-b6af96960000',
      uri: 'http://www.univision.com/devuelvemeunivision',
      type: 'externalcontent',
      updateDate: null,
      publishDate: null,
      title: 'Han perdido el acceso a todos los canales de Univision. Llamen ya al 800-500-4252.',
      description: null,
      image: {},
    },
  ],
  secondaryContent: null,
  theme: {
    primary: '#000',
  },
};

const multipleItems = [
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'Lo extravagante, lo clásico y lo elegante en la gala del Met 2017 slides',
    uid: 'aaaaa1',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'K-Love 107.5 Copy Section test',
    uid: 'aaaaa2',
  },
];

const sevenItems = [
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'Lo extravagante, lo clásico y lo elegante en la gala del Met 2017 slides',
    uid: 'aaaaa1',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'K-Love 107.5 Copy Section test',
    uid: 'aaaaa2',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'K-Love 107.5 Copy Section test',
    uid: 'aaaaa3',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'K-Love 107.5 Copy Section test',
    uid: 'aaaaa4',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'K-Love 107.5 Copy Section test',
    uid: 'aaaaa5',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'K-Love 107.5 Copy Section test',
    uid: 'aaaaa6',
  },
  {
    uri: 'http://www.univision.com/devuelvemeunivision',
    type: 'externalcontent',
    title: 'K-Love 107.5 Copy Section test',
    uid: 'aaaaa7',
  },
];

const arr = [];
const obj = {};

const timer = {
  start: jest.fn(),
  stop: jest.fn(),
  cancel: jest.fn(),
};

/** @test {NotificationBanner} */
describe('NotificationBanner Spec', () => {
  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NotificationBanner
      content={contentItems.contents}
      settings={contentItems.settings}
      theme={contentItems.theme}
    />, div);
  });

  it('should render two Link components', () => {
    const wrapper = shallow(<NotificationBanner
      content={contentItems.contents}
      settings={contentItems.settings}
      theme={contentItems.theme}
    />);
    expect(wrapper.find('Link').length).toBe(2);
  });

  it('should render empty div if content is empty', () => {
    const wrapper = shallow(<NotificationBanner content={arr} settings={obj} theme={obj} />);
    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('should not apply maxHeight if have not childNodes', () => {
    const wrapper = mount(
      <NotificationBanner
        content={arr}
        settings={obj}
        theme={obj}
      />
    );
    wrapper.instance().notificationList.current = { childNodes: null };
    wrapper.instance().setMaxItemHeight();
    expect(wrapper.state('maxItemHeight')).toBe(0);
  });

  it('should return null if there is not items', () => {
    const wrapper = shallow(<NotificationBanner content={arr} settings={obj} theme={obj} />);
    const instance = wrapper.instance();
    expect(instance.renderSingleItem()).toBe(null);
  });

  it('should render multiple items', () => {
    const wrapper = mount(<NotificationBanner
      content={multipleItems}
      settings={contentItems.settings}
      theme={obj}
    />);
    expect(wrapper.find(`.${Styles.multipleItems}`).length).toBe(1);
  });

  it('should add the resize event listener on mount', () => {
    global.addEventListener = jest.fn();
    const wrapper = shallow(<NotificationBanner content={arr} settings={obj} theme={obj} />);
    wrapper.instance().componentDidMount();
    expect(global.addEventListener).toHaveBeenCalled();
  });

  it('should remove resize event listener on unmount', () => {
    global.removeEventListener = jest.fn();
    const wrapper = shallow(<NotificationBanner content={arr} settings={obj} theme={obj} />);
    wrapper.instance().componentWillUnmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should call init timer', () => {
    const wrapper = mount(<NotificationBanner
      content={multipleItems}
      settings={obj}
      theme={obj}
    />);
    const instance = wrapper.instance();
    const initTimer = jest.spyOn(instance, 'initTimer');
    wrapper.instance().initTimer();
    jest.runTimersToTime(7000);
    expect(initTimer).toHaveBeenCalled();
    expect(wrapper.find(`ul.${Styles.multipleItems} li`).length).toBe(2);
  });

  it('should set state when onIntervalEnd is called', () => {
    const wrapper = mount(<NotificationBanner
      content={multipleItems}
      settings={obj}
      theme={obj}
    />);
    const instance = wrapper.instance();
    instance.timer = timer;
    expect(wrapper.state('activeItem')).toBe(0);
    instance.onIntervalEnd();
    expect(wrapper.state('activeItem')).toBe(1);
  });

  it('should return a maximum of 5 items', () => {
    const wrapper = mount(<NotificationBanner
      content={sevenItems}
      settings={obj}
      theme={obj}
    />);
    expect(wrapper.find(`ul.${Styles.multipleItems} li`).length).toBe(5);
  });

  it('should apply `Breaking News` theme', () => {
    const content = multipleItems.map(item => ({
      ...item,
      contentPriority: 'breaking_news',
    }));
    const wrapper = mount(<NotificationBanner
      content={content}
      settings={obj}
      theme={obj}
    />);
    expect(wrapper.find('.breakingNews').length).toBe(1);
  });

  it('should not crash if there is not content.', () => {
    const wrapper = shallow(<NotificationBanner content={[]} settings={obj} theme={obj} />);
    wrapper.instance().setMaxItemHeight();
  });

  it('should apply the max height', () => {
    const wrapper = mount(
      <NotificationBanner
        content={multipleItems}
        settings={obj}
        theme={obj}
      />
    );
    wrapper.instance().notificationList.current.childNodes.forEach((node) => {
      Object.defineProperty(node, 'clientHeight', { value: 250, writable: true });
    });
    jest.advanceTimersByTime(500);
    expect(wrapper.state('maxItemHeight')).toBe(250);
  });

  it('should cancel timer when unmounted', () => {
    const wrapper = mount(<NotificationBanner
      content={multipleItems}
      settings={obj}
      theme={obj}
    />);
    const { timer: myTimer } = wrapper.instance();
    spyOn(myTimer, 'cancel');
    wrapper.unmount();
    expect(myTimer.cancel).toHaveBeenCalled();
  });
});
