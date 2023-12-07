import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import MonthContent from '.';
import mockMonths from './__mock__/monthContent';

describe('ArchivedSiteMap MonthContent component tests', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MonthContent />, div);
  });
  it('should render correctly without data', () => {
    const wrapper = mount(<MonthContent />);
    expect(wrapper.find('ArchiveTitle__MainTitle')).toHaveLength(1);
    expect(wrapper.find('MonthContent__Description')).toHaveLength(1);
  });
  it('should render mock months', () => {
    const wrapper = mount(<MonthContent {...mockMonths} />);
    expect(wrapper.find('MonthContent__MonthWrapper')).toHaveLength(1);
    expect(wrapper.find('Title__TitleStyled')).toHaveLength(31);
  });
});
