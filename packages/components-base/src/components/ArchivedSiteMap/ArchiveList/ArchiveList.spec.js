import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import ArchiveList from '.';
import archivesMock from './__mock__/listContent';

const trackerMock = jest.fn();

describe('ArchivedSiteMap ArchiveList component tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ArchiveList />, div);
  });
  it('should render correctly without data', () => {
    const wrapper = mount(<ArchiveList />);
    expect(wrapper.find('ArchiveTitle__Wrapper')).toHaveLength(1);
    expect(wrapper.find('ArchiveList__Description')).toHaveLength(1);
  });
  it('should render mock months', () => {
    const wrapper = mount(<ArchiveList {...archivesMock} />);
    expect(wrapper.find('ArchiveList__Archive')).toHaveLength(25);
  });
  it('should call click tracker method', () => {
    const wrapper = mount(<ArchiveList {...archivesMock} clickTracking={trackerMock} />);
    wrapper.find('li Title Link').first().simulate('click');
    expect(trackerMock).toHaveBeenCalledTimes(1);
  });
  it('should not call click tracker method', () => {
    const wrapper = mount(<ArchiveList {...archivesMock} />);
    wrapper.find('li Title Link').first().simulate('click');
    expect(trackerMock).toHaveBeenCalledTimes(0);
  });
});
