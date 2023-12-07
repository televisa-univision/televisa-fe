import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';

import mock from '../mock.json';
import JobsWidget from './index';

describe('Job Widget Component', () => {
  it('should render component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<JobsWidget />, div);
  });

  it('should render no results', async () => {
    const wrapper = mount(
      <JobsWidget jobs={[]} />
    );

    expect(wrapper.find('JobsWidget__Container')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(1);
  });

  it('should render no results with custom text', async () => {
    const customMessage = 'no results custom';
    const wrapper = mount(
      <JobsWidget jobs={[]} noResultsMessage={customMessage} />
    );

    expect(wrapper.find('JobsWidget__Container')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__NoResults span').text()).toBe(customMessage);
  });

  it('should render null from noResults when loading', async () => {
    const wrapper = mount(
      <JobsWidget jobs={[]} loading />
    );

    expect(wrapper.find('JobsWidget__Container')).toHaveLength(1);
    expect(wrapper.find('JobsWidget__NoResults')).toHaveLength(0);
    expect(wrapper.find('JobsWidget__LoadingSpinner')).toHaveLength(1);
  });

  it('should render jobs', () => {
    const wrapper = mount(<JobsWidget jobs={mock.jobs} />);

    expect(wrapper.find('JobsWidget__Container')).toHaveLength(1);
    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
  });

  it('should render spanish texts', () => {
    const wrapper = mount(<JobsWidget jobs={mock.jobs} language="es" />);

    expect(wrapper.find('JobsWidget__Container')).toHaveLength(1);
    expect(wrapper.find('Memo(ResultItem)').length).toBeGreaterThan(1);
    expect(wrapper.find('Memo(ResultItem)').first().props().language).toEqual('es');
    expect(wrapper.find('JobsWidget__ButtonWrapper')).toHaveLength(1);
  });

  it('should call load more callback', () => {
    const handler = {
      loadMore: jest.fn(),
    };
    const wrapper = mount(
      <JobsWidget
        handleLoadMore={handler.loadMore}
        jobs={[]}
        showLoadMore
      />
    );
    wrapper.find('ListButton__StyledButton').simulate('click');
    expect(handler.loadMore).toHaveBeenCalled();
  });
});
