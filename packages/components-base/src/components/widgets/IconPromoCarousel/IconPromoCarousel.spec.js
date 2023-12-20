import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import * as spaHelpers from '@univision/fe-commons/dist/utils/helpers/spa';
import Tracker from '@univision/fe-commons/dist/utils/tracking/tealium/Tracker';
import features from '@univision/fe-commons/dist/config/features';
import IconPromoCarousel from '.';
import mockData from './__mocks__/data.json';
import Item from './Item';

const props = {
  content: mockData,
  theme: {
    isDark: false,
  },
};
jest.useFakeTimers();
features.content.hasEnhancement = jest.fn(() => false);
/** @test {IconPromoCarousel} */
describe('IconPromoCarousel Spec', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<IconPromoCarousel {...props} />, div);
    jest.runAllTimers();
  });

  it('should add the resize event listener on mount', () => {
    global.addEventListener = jest.fn();
    const wrapper = shallow(<IconPromoCarousel {...props} />);
    const iconPromoCarousel = shallow(wrapper.prop('children')());
    jest.runAllTimers();
    iconPromoCarousel.instance().componentDidMount();
    expect(global.addEventListener).toHaveBeenCalled();
  });

  it('should remove resize event listener on unmount', () => {
    global.removeEventListener = jest.fn();
    const wrapper = shallow(<IconPromoCarousel {...props} />);
    const iconPromoCarousel = shallow(wrapper.prop('children')());
    jest.runAllTimers();
    iconPromoCarousel.instance().componentWillUnmount();
    expect(global.removeEventListener).toHaveBeenCalled();
  });

  it('should not render the slider or list if there is not data', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<IconPromoCarousel content={null} />);
    const iconPromoCarousel = shallow(wrapper.prop('children')());
    jest.runAllTimers();
    expect(iconPromoCarousel.find('.promoList')).toHaveLength(0);
    expect(iconPromoCarousel.find('.carousel')).toHaveLength(0);
  });

  it('should render with show styles when /shows', () => {
    features.shows.showsRedesign = jest.fn(() => true);
    props.settings = { title: 'Test' };
    const wrapper = mount(<IconPromoCarousel {...props} />);

    expect(wrapper.find('IconPromoCarousel__Container')).toHaveStyleRule('background-color', '#000000');
  });

  it('should render WidgetTitle when hasEnhancement is true', () => {
    features.shows.showsRedesign = jest.fn(() => true);
    features.content.hasEnhancement.mockReturnValueOnce(true);
    props.settings = { title: 'Test' };
    const wrapper = mount(<IconPromoCarousel {...props} />);

    expect(wrapper.find('IconPromoCarousel__Container')).toHaveStyleRule('background-color', '#000000');
    expect(wrapper.find('WidgetTitle')).toHaveLength(1);
  });

  it('check the wrapper dimentions to print slider or list', () => {
    const wrapper = shallow(<IconPromoCarousel {...props} />);
    jest.runAllTimers();
    const iconPromoCarousel = shallow(wrapper.prop('children')());
    const instance = iconPromoCarousel.instance();
    instance.wrapper = { offsetWidth: 1480 };
    instance.detectDimensions();
    expect(iconPromoCarousel.state('printSlider')).toBe(false);
  });

  it('should not render items if there is not content', () => {
    const wrapper = shallow(<IconPromoCarousel content={[0]} />);
    jest.runAllTimers();
    const iconPromoCarousel = shallow(wrapper.prop('children')());
    expect(iconPromoCarousel.find('.item')).toHaveLength(0);
  });

  it('item should have a variant dark', () => {
    props.theme.isDark = true;
    const wrapper = shallow(<IconPromoCarousel {...props} />);
    const iconPromoCarousel = shallow(wrapper.prop('children')());
    jest.runAllTimers();
    expect(iconPromoCarousel.find(Item).first().prop('variant')).toBe('dark');
  });

  it('should display 3 items on 320 screens', () => {
    global.innerWidth = 320;
    const wrapper = mount(<IconPromoCarousel {...props} />);
    jest.runAllTimers();
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('[itemsToBeDisplayed]').props()).toHaveProperty('itemsToBeDisplayed.xs', 3);
  });

  it('should not fire the track event when onPressHandler has not url or window is undefined', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    const wrapper = shallow(<IconPromoCarousel {...props} />);
    jest.runAllTimers();
    const iconPromoCarousel = shallow(wrapper.prop('children')());
    const instance = iconPromoCarousel.instance();

    // Create a spy on the window
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockReturnValue({
      ...global.window,
      location: { href: '#' },
    });

    instance.onPressHandler();
    expect(fireEventSpy).not.toHaveBeenCalled();

    windowSpy.mockRestore();
  });

  it('should fire the track event on when onPressHandler is called', () => {
    const fireEventSpy = jest.spyOn(Tracker, 'fireEvent');
    let wrapper = shallow(<IconPromoCarousel {...props} />);
    jest.runAllTimers();
    let iconPromoCarousel = shallow(wrapper.prop('children')());
    let instance = iconPromoCarousel.instance();

    // create a spy on the window
    const windowSpy = jest.spyOn(global, 'window', 'get');
    windowSpy.mockReturnValue({
      ...global.window,
      location: { href: '#' },
    });

    instance.onPressHandler('https://www.univision.com/entretenimiento/aries', 'label');
    jest.runAllTimers();
    expect(fireEventSpy).toHaveBeenCalled();
    instance.onPressHandler('https://www.univision.com/entretenimiento/aries');
    spyOn(storeHelpers, 'getPageData').and.returnValue(null);
    wrapper = shallow(<IconPromoCarousel {...props} />);
    iconPromoCarousel = shallow(wrapper.prop('children')());
    instance = iconPromoCarousel.instance();
    instance.item = { offsetTop: 0 };
    instance.onPressHandler('https://www.univision.com/entretenimiento/aries', 'label');

    windowSpy.mockRestore();
  });

  it('should call history.push if context.history is set', () => {
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(false);
    const history = {
      push: jest.fn(fn => fn),
    };
    const wrapper = shallow(<IconPromoCarousel {...props} />);
    jest.runAllTimers();
    const iconPromoCarousel = shallow(wrapper.prop('children')({ history }));
    // shallow(wrapper.prop('children')({ history }));
    const instance = iconPromoCarousel.instance();
    instance.onPressHandler('https://www.univision.com/entretenimiento/aries', 'label');
    jest.runAllTimers();
    expect(history.push).toHaveBeenCalled();
  });

  it('should not call history.push if context.history is set and should skip spa', () => {
    spyOn(spaHelpers, 'shouldSkipSpa').and.returnValue(true);
    const history = {
      push: jest.fn(fn => fn),
    };
    const wrapper = shallow(<IconPromoCarousel {...props} />);
    jest.runAllTimers();
    const iconPromoCarousel = shallow(wrapper.prop('children')({ history }));
    // shallow(wrapper.prop('children')({ history }));
    const instance = iconPromoCarousel.instance();
    instance.onPressHandler('https://www.univision.com/entretenimiento/aries', 'label');
    jest.runAllTimers();
    expect(history.push).not.toHaveBeenCalled();
  });
});
