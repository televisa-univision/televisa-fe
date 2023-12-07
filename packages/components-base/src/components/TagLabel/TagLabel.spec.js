import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import features from '@univision/fe-commons/dist/config/features';
import TagLabel from '.';

const primaryTag = {
  link: 'https://www.univision.com/entretenimiento',
  name: 'Entretenimiento',
};

/** @test {TagLabel} */
describe('TagLabel', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TagLabel tag={primaryTag} />, div);
  });
  it('should have Link component', () => {
    const wrapper = shallow(<TagLabel tag={primaryTag} />);
    expect(wrapper.find('Link')).toBeDefined();
  });
  it('should render with fallback values', () => {
    const primaryTagFallback = {
      title: 'Noticias',
    };
    const wrapper = shallow(<TagLabel tag={primaryTagFallback} />);
    expect(wrapper.find('Link').prop('href')).toBe('#');
    expect(wrapper.find('Link').childAt(0).text()).toBe('Noticias');
  });
  it('should have child', () => {
    const wrapper = shallow(<TagLabel tag={primaryTag} />);
    expect(wrapper.find('Link').children()).toBeDefined();
    expect(wrapper.find('Link').childAt(0).text()).toBe(primaryTag.name);
  });
  it('should return null if tag doesnt exist', () => {
    const wrapper = shallow(<TagLabel tag={{}} />);
    expect(wrapper.type()).toEqual(null);
  });
  it('should render icon', () => {
    const wrapper = shallow(<TagLabel tag={primaryTag} icon="univision" />);
    expect(wrapper.find('TagLabel__IconStyled')).toHaveLength(1);
  });
  it('should have isWorldCupMVP', () => {
    features.deportes.isWorldCupMVP = jest.fn(() => true);
    const wrapper = mount(<TagLabel tag={primaryTag} />);
    expect(wrapper.find('TagLabel__LabelStyled').prop('isWorldCupMVP')).toBe(true);
  });
});
