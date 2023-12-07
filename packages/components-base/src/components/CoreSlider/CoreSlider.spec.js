import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Loadable from 'react-loadable';

import { getDevice } from '@univision/fe-commons/dist/store/storeHelpers';

import CoreSlider from '.';

jest.mock('@univision/fe-icons/dist/components/Icon', () => jest.fn());

jest.mock('@univision/fe-commons/dist/store/storeHelpers', () => ({
  getDevice: jest.fn(),
}));

beforeEach(() => {
  getDevice.mockImplementation(() => 'mobile');
});

/** @test {CoreSlider} */
describe('CoreSlider Spec', () => {
  const divList = [
    <div key={0}>A</div>,
    <div key={1}>B</div>,
    <div key={2}>C</div>,
    <div key={3}>D</div>,
    <div key={4}>E</div>,
  ];
  test('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<CoreSlider infinite={false}>{divList}</CoreSlider>, div);
  });
  describe('render', () => {
    it('should render coreSlider', () => {
      const wrapper = shallow(<CoreSlider type="Carousel" shouldUpdate={false} infinite={false}>{divList}</CoreSlider>);
      expect(wrapper.contains(<div>C</div>)).toBe(true);
    });

    it('should return null if no children', () => {
      const wrapper = shallow(<CoreSlider type="Carousel" shouldUpdate={false} infinite={false} />);
      expect(wrapper.contains(<div>C</div>)).toBe(false);
    });

    it('should evaluate shouldComponentUpdate', () => {
      const wrapper = shallow(<CoreSlider type="Carousel" shouldUpdate={false} infinite={false}>{divList}</CoreSlider>);
      const props = {
        infinite: true,
        shouldUpdate: true,
      };

      // Spy on the lifecycle method, without mocking its contents
      spyOn(CoreSlider.prototype, 'shouldComponentUpdate').and.callThrough();
      expect(wrapper.instance().shouldComponentUpdate()).toBe(false);

      // Set props to trigger a call to shouldComponentUpdate
      wrapper.setProps(props);
      expect(wrapper.instance().shouldComponentUpdate()).toBe(true);
      expect(CoreSlider.prototype.shouldComponentUpdate).toBeCalled();
    });
  });

  it('adds onChangeSlide to afterChange settings', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<CoreSlider onChangeSlide={mockFn} />);
    const settings = wrapper.instance().getSettings();
    settings.afterChange();
    expect(mockFn).toHaveBeenCalled();
  });

  it('getSettings adds a className if clientInitialized is truthy', () => {
    const wrapper = shallow(<CoreSlider type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()}>{divList}</CoreSlider>);
    wrapper.setState({ clientInitialized: true });
    expect(wrapper.instance().getSettings().className).toMatch('slick-client-ready');

    wrapper.setProps({ className: 'hello' });
    expect(wrapper.instance().getSettings().className).toEqual('hello slick-client-ready');
  });

  it('getSettings adds tooltip classname', () => {
    const wrapper = shallow(<CoreSlider type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()} tooltip>{divList}</CoreSlider>);
    expect(wrapper.find('.slick-tooltip')).toHaveLength(1);
  });

  it('should return null if no param is added', () => {
    /* eslint-disable react/no-children-prop */
    const wrapper = shallow(<CoreSlider children={null} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('uses first child as placeholder for reactSlick', () => {
    const wrapper = shallow(<CoreSlider type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()} tooltip>{divList}</CoreSlider>);

    expect(wrapper.find('LoadableComponent').dive().getElement().type().props).toHaveProperty('className', 'row no-gutters');
    expect(wrapper.find('LoadableComponent').dive().getElement().type().props.children).toHaveLength(1);
    expect(wrapper.find('LoadableComponent').dive().getElement().type().props.children[0]).toEqual(<div key="sliderPlaceHolder0" className="col-12">{divList[0]}</div>);
  });

  it('uses first 4 children as placeholder for reactSlick on desktop', () => {
    getDevice.mockImplementation(() => 'desktop');

    const wrapper = shallow(<CoreSlider type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()} tooltip>{divList}</CoreSlider>);

    expect(wrapper.find('LoadableComponent').dive().getElement().type().props).toHaveProperty('className', 'row no-gutters');
    expect(wrapper.find('LoadableComponent').dive().getElement().type().props.children).toHaveLength(4);
    expect(wrapper.find('LoadableComponent').dive().getElement().type().props.children[0]).toEqual(<div key="sliderPlaceHolder0" className="col-md-3">{divList[0]}</div>);
  });

  it('on desktop, renders cards equal to the length of children if less than limit for reactSlick', () => {
    getDevice.mockImplementation(() => 'desktop');

    const wrapper = shallow(<CoreSlider type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()} tooltip>{divList.slice(0, 3)}</CoreSlider>);

    expect(wrapper.find('LoadableComponent').dive().getElement().type().props).toHaveProperty('className', 'row no-gutters');
    expect(wrapper.find('LoadableComponent').dive().getElement().type().props.children).toHaveLength(3);
    expect(wrapper.find('LoadableComponent').dive().getElement().type().props.children[0]).toEqual(<div key="sliderPlaceHolder0" className="col-md-3">{divList[0]}</div>);
  });

  it('uses custom placeholder for reactSlick', () => {
    const wrapper = shallow(<CoreSlider placeholder={<p>Loading</p>} type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()} tooltip>{divList}</CoreSlider>);
    expect(wrapper.find('LoadableComponent').dive().getElement().type()).toEqual(<p>Loading</p>);
  });

  it('returns null if no children are passed', () => {
    const wrapper = shallow(<CoreSlider type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()} tooltip />);
    expect(wrapper.type()).toBe(null);
  });

  it('should send the slider to the specified slide', async () => {
    const wrapper = mount(<CoreSlider type="Carousel" shouldUpdate={false} infinite={false}>{divList}</CoreSlider>);
    await Loadable.preloadAll();
    wrapper.update();

    const slider = wrapper.find('Slider').instance();
    spyOn(slider, 'slickGoTo').and.callThrough();
    wrapper.instance().goToSlide(1);
    expect(slider.slickGoTo).toHaveBeenCalledTimes(1);
  });

  it('should not send the slider to the specified slide if the ref does not exist', async () => {
    const wrapper = mount(<CoreSlider type="Carousel" shouldUpdate={false} infinite={false}>{divList}</CoreSlider>);
    await Loadable.preloadAll();
    wrapper.update();

    const slider = wrapper.find('Slider').instance();
    spyOn(slider, 'slickGoTo').and.callThrough();
    wrapper.instance().slider.current = null;
    wrapper.instance().goToSlide(1);
    expect(slider.slickGoTo).toHaveBeenCalledTimes(0);
  });
});
