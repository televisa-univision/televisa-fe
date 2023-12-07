import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import Month from '.';

const trackerMock = jest.fn();

describe('ArchivedSiteMap Month component tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Month />, div);
  });
  it('should render correctly with data', () => {
    const wrapper = mount(<Month totalParts={10} />);
    expect(wrapper.find('Title__TitleStyled')).toHaveLength(11);
  });
  it('should call click tracking method', () => {
    const wrapper = mount(<Month totalParts={10} clickTracking={trackerMock} />);
    wrapper.find('Link').first().simulate('click');
    expect(trackerMock).toHaveBeenCalledTimes(1);
  });
  it('should not call click tracking method', () => {
    const wrapper = mount(<Month totalParts={10} />);
    wrapper.find('Link').first().simulate('click');
    expect(trackerMock).toHaveBeenCalledTimes(0);
  });
});
