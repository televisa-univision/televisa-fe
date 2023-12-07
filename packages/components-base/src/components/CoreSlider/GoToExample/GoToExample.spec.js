import React from 'react';
import Loadable from 'react-loadable';
import { shallow, mount } from 'enzyme';
import CoreSlider from '..';
import GoToExample from '.';

jest.mock('../../Button', () => 'button');
jest.mock('@univision/fe-icons/dist/components/Icon', () => 'Icon');

describe('GoToExample tests', () => {
  it('should render without issues', () => {
    const wrapper = shallow(<GoToExample />);
    expect(wrapper.getElement()).toBeDefined();
  });

  it('should call goToPage when the circle is clicked', async () => {
    spyOn(GoToExample.prototype, 'goToSlide3').and.callThrough();
    const wrapper = mount(<GoToExample />);
    await Loadable.preloadAll();
    wrapper.update();
    const button = wrapper.find('.dummyButton');
    button.simulate('click');
    expect(GoToExample.prototype.goToSlide3).toHaveBeenCalledTimes(1);
  });
});

describe('CoreSlider related test', () => {
  const divList = [
    <div key={0}>A</div>,
    <div key={1}>B</div>,
    <div key={2}>C</div>,
    <div key={3}>D</div>,
    <div key={4}>E</div>,
  ];

  it('adds onChangeSlide to afterChange settings', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<CoreSlider onChangeSlide={mockFn} />);
    const settings = wrapper.instance().getSettings();
    settings.afterChange();
    expect(mockFn).toHaveBeenCalled();
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

  it('getSettings adds tooltip classname', () => {
    const wrapper = shallow(<CoreSlider type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()} tooltip>{divList}</CoreSlider>);
    expect(wrapper.find('.slick-tooltip')).toHaveLength(1);
  });

  it('should return null if no param is added', () => {
    /* eslint-disable react/no-children-prop */
    const wrapper = shallow(<CoreSlider children={null} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('uses custom placeholder for reactSlick', () => {
    const wrapper = shallow(<CoreSlider placeholder={<p>Loading</p>} type="Carousel" activeSlide={1} interval={7} endIndex={20} onChangeSlide={jest.fn()} tooltip>{divList}</CoreSlider>);
    expect(wrapper.find('LoadableComponent').dive().getElement().type()).toEqual(<p>Loading</p>);
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
