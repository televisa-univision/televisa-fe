import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import ArchiveTitle from '.';

describe('ArchivedSiteMap ArchiveTitle component tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArchiveTitle />, div);
  });
  it('should show arrow ArchiveTitle', () => {
    const wrapper = mount(<ArchiveTitle isArrowActive />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });
  it('should show second title', () => {
    const wrapper = mount(<ArchiveTitle isArrowActive secondLabel="test" />);
    expect(wrapper.find('ArchiveTitle__SecondTitle')).toHaveLength(1);
  });
  it('should show third title', () => {
    const wrapper = mount(<ArchiveTitle isArrowActive thirdLabel="test" />);
    expect(wrapper.find('ArchiveTitle__ThirdTitle')).toHaveLength(1);
  });
});
