import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import YearContent from '.';
import mockYears from './__mock__/yearContent';

const trackerMock = jest.fn();

describe('ArchivedSiteMap YearContent component tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<YearContent />, div);
  });
  it('should render correctly without data', () => {
    const wrapper = mount(<YearContent />);
    expect(wrapper.find('YearContent__Description')).toHaveLength(1);
  });
  it('should render mock years', () => {
    const wrapper = mount(<YearContent {...mockYears} />);
    expect(wrapper.find('YearContent__YearWrapper')).toHaveLength(1);
    expect(wrapper.find('Title__TitleStyled')).toHaveLength(21);
  });
  it('should call click tracker method', () => {
    const wrapper = mount(<YearContent {...mockYears} clickTracking={trackerMock} />);
    wrapper.find('YearContent__YearTitle Link').first().simulate('click');
    expect(trackerMock).toHaveBeenCalledTimes(1);
  });
  it('should not call click tracker method', () => {
    const wrapper = mount(<YearContent {...mockYears} />);
    wrapper.find('YearContent__YearTitle Link').first().simulate('click');
    expect(trackerMock).toHaveBeenCalledTimes(0);
  });
});
