import React from 'react';
import { mount } from 'enzyme';
import Clickable from '@univision/fe-components-base/dist/components/Clickable';
import Dropdown from '@univision/fe-components-base/dist/components/Dropdown';
import CategorySponsors from '.';
import mockData from '../mockData';
import ItemCard from '../ItemCard';
import { ALLSUBCATEGORIES } from '../constants';

let data;
beforeEach(() => {
  data = mockData.data.widgets[1].contents;
});

describe('CategorySponsors', () => {
  it('returns null if there are no sponsors for the category', () => {
    const wrapper = mount(<CategorySponsors sponsors={data} category="Home" allSubcategories={ALLSUBCATEGORIES} />);
    expect(wrapper.isEmptyRender()).toBe(true);
  });

  it('renders without crashing', () => {
    const wrapper = mount(<CategorySponsors sponsors={data} category="Legal" allSubcategories={ALLSUBCATEGORIES} />);
    expect(wrapper.find(ItemCard)).toHaveLength(6);
  });

  it('renders Clickable if there are more than 6 sponsors', () => {
    const wrapper = mount(<CategorySponsors sponsors={data} category="Legal" allSubcategories={ALLSUBCATEGORIES} />);
    expect(wrapper.find(Clickable)).toHaveLength(1);
  });

  it('renders more sponsors if Clickable is clicked', () => {
    const wrapper = mount(<CategorySponsors sponsors={data} category="Legal" allSubcategories={ALLSUBCATEGORIES} />);
    wrapper.find(Clickable).simulate('click');
    expect(wrapper.find(ItemCard).length).toBeGreaterThan(6);
  });

  it('renders 6 sponsors again if Clickable is clicked 2 times', () => {
    const wrapper = mount(<CategorySponsors sponsors={data} category="Legal" allSubcategories={ALLSUBCATEGORIES} />);
    expect(wrapper.find(ItemCard)).toHaveLength(6);
    wrapper.find(Clickable).simulate('click');
    expect(wrapper.find(ItemCard).length).toBeGreaterThan(6);
    wrapper.find(Clickable).simulate('click');
    expect(wrapper.find(ItemCard)).toHaveLength(6);
  });

  it('doesnt render Clickable if there are less than 6 sponsors', () => {
    const wrapper = mount(<CategorySponsors sponsors={data} category="Health" allSubcategories={ALLSUBCATEGORIES} />);
    expect(wrapper.find(Clickable)).toHaveLength(0);
  });

  it('changes sponsors on category change and deletes Clickable is they are less than 6', () => {
    const wrapper = mount(<CategorySponsors sponsors={data} category="Legal" allSubcategories={ALLSUBCATEGORIES} />);
    expect(wrapper.find(ItemCard)).toHaveLength(6);
    wrapper.find(Dropdown).first().find('select').simulate('change', { target: { value: '2' } });
    expect(wrapper.find(ItemCard)).toHaveLength(1);
    expect(wrapper.find(Clickable)).toHaveLength(0);
  });
  it('should not return city if not available', () => {
    const wrapper = mount(<CategorySponsors sponsors={data} category="Legal" city="Arizona" allSubcategories={ALLSUBCATEGORIES} />);
    expect(wrapper.find(ItemCard)).toHaveLength(0);
  });
});
