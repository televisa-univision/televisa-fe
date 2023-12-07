import React from 'react';
import { shallow } from 'enzyme';

import localization from '../../../../../../utils/localization';
import MatchInfoCard from '.';

let props;
beforeEach(() => {
  props = {
    type: 'screen',
    info: 'Univision',
  };
});

describe('MatchInfoCard tests', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<MatchInfoCard {...props} />);
    expect(wrapper.find('.container')).toHaveLength(1);
  });
  it('renders info', () => {
    const wrapper = shallow(<MatchInfoCard {...props} />);
    expect(wrapper.find('.uvs-font-a-regular').text()).toEqual('Univision');
  });
  it('renders title', () => {
    const wrapper = shallow(<MatchInfoCard {...props} />);
    expect(wrapper.find('.uvs-font-a-bold').text()).toEqual(localization.get('tvChannel'));
  });
  it('renders fault icon', () => {
    const wrapper = shallow(<MatchInfoCard type="fault" info="test" />);
    expect(wrapper.find('Icon').length).toBe(1);
  });
  it('renders fault icon with no data', () => {
    const wrapper = shallow(<MatchInfoCard type="fault" info="" />);
    expect(wrapper.find('Icon').length).toBe(1);
  });
  it('renders stadium icon', () => {
    const wrapper = shallow(<MatchInfoCard type="field" info="test" />);
    expect(wrapper.find('Icon').length).toBe(1);
  });
  it('renders stadium icon', () => {
    const wrapper = shallow(<MatchInfoCard type="cup" info="test" />);
    expect(wrapper.find('Icon').length).toBe(1);
  });
  it('should render even if no props are present', () => {
    const wrapper = shallow(<MatchInfoCard />);
    expect(wrapper.find('Icon').length).toBe(0);
    expect(wrapper.find('span').length).toBe(2);
  });
  it('should render extra info if provided', () => {
    const wrapper = shallow(<MatchInfoCard type="cup" info="test" extra="extra" />);
    expect(wrapper.find('Icon').length).toBe(1);
    expect(wrapper.find('span').length).toBe(3);
  });
  it('should render with logo', () => {
    const wrapper = shallow(<MatchInfoCard type="screen" info="udn" logo="img.png" />);
    expect(wrapper.find('Image').length).toBe(1);
    expect(wrapper.find('.cardInfoLogo').length).toBe(1);
  });
});
