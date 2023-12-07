import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import NavigationTracker from '@univision/fe-commons/dist/utils/tracking/tealium/navigation/NavigationTracker';
import features from '@univision/fe-commons/dist/config/features';

import LocalDropDown from '.';

const mockEvent = {
  target: {
    getAttribute: jest.fn(() => 'name'),
  },
};

const props = {
  name: 'Más',
  options: [
    {
      name: 'Ofertas de trabajo',
      link: 'http://univision.com',
    },
    {
      name: 'Pregunta al experto',
      link: 'http://univision.com',
    },
  ],
};

/** @test {LocalDropDown} */
describe('LocalDropDown', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const el = (
      <LocalDropDown />
    );
    ReactDOM.render(el, div);
  });

  it('should render correctly', () => {
    const wrapper = mount(<LocalDropDown {...props} />);
    expect(wrapper.find('LocalDropDown__Wrapper')).toHaveLength(1);
  });

  it('should not render if it has no options', () => {
    const wrapper = mount(<LocalDropDown {...props} options={[null, 1]} />);
    expect(wrapper.find('LocalDropDown__Wrapper')).toHaveLength(0);
  });

  it('should render correctly', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<LocalDropDown {...props} />);
    expect(wrapper.find('LocalDropDown__Wrapper')).toHaveLength(1);
  });

  it('should open and clsoe the drop down options when the button is tapped', () => {
    const trackerSpy = jest.spyOn(NavigationTracker, 'track');
    const wrapper = mount(<LocalDropDown {...props} />);

    act(() => {
      wrapper.find('LocalDropDown__Title').first().simulate('click', mockEvent);
    });

    wrapper.update();
    expect(wrapper.find('LocalDropDown__OptionsWrapper').first().prop('isVisible')).toBeTruthy();
    expect(trackerSpy).toHaveBeenCalled();

    act(() => {
      wrapper.find('LocalDropDown__OptionLink').first().simulate('click', mockEvent);
    });

    wrapper.update();
    expect(wrapper.find('LocalDropDown__OptionsWrapper').first().prop('isVisible')).toBeFalsy();
    expect(trackerSpy).toHaveBeenCalled();

    act(() => {
      wrapper.find('LocalDropDown__Title').first().simulate('click', mockEvent);
    });

    wrapper.update();
    expect(wrapper.find('LocalDropDown__OptionsWrapper').first().prop('isVisible')).toBeTruthy();
    expect(trackerSpy).toHaveBeenCalled();

    act(() => {
      wrapper.find('LocalDropDown__HoverSquare').first().simulate('click', mockEvent);
    });

    wrapper.update();
    expect(wrapper.find('LocalDropDown__OptionsWrapper').first().prop('isVisible')).toBeFalsy();
    expect(trackerSpy).toHaveBeenCalled();
  });
});
