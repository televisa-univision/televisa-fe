import React from 'react';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import mockPageApiData from 'server/proxy/api/page/__mocks__/mockSearchPageApiData.json';

import SearchBody from '.';

const mockEvent = {
  preventDefault: jest.fn(),
  target: {},
};

const getSearchResultsMock = jest.fn();
const setSearchQueryMock = jest.fn();
const setFilterTypeMock = jest.fn();
const setDateFilterMock = jest.fn();
const setPageNumberMock = jest.fn();

const results = [
  {
    type: 'article',
    uid: '0',
  },
  {
    type: 'video',
    uid: '1',
  },
  {
    type: 'slideshow',
    uid: '2',
  },
];

describe('Search Body Spec', () => {
  beforeEach(() => {
    Store.dispatch(setPageData({ data: mockPageApiData }));
    getSearchResultsMock.mockClear();
    setSearchQueryMock.mockClear();
    setFilterTypeMock.mockClear();
    setDateFilterMock.mockClear();
    setPageNumberMock.mockClear();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<SearchBody results={results} ready />);
    expect(wrapper).toBeDefined();
  });

  it('should return an empty div if there is not page data', () => {
    Store.dispatch(setPageData({ data: undefined }));
    const wrapper = shallow(<SearchBody />);
    expect(wrapper.type()).toEqual(null);
  });

  it('should render sidebar if the device is desktop', () => {
    Store.dispatch(setPageData({
      device: 'desktop',
      data: mockPageApiData,
    }));
    const wrapper = mount(<SearchBody results={results} ready={false} />);
    expect(wrapper.find('Sidebar').length).toBe(1);
  });

  it('should call functions', () => {
    shallow(<SearchBody
      ready
      results={results}
      getSearchResults={getSearchResultsMock}
      setSearchQuery={setSearchQueryMock}
    />);
    expect(setSearchQueryMock).toBeCalled();
    expect(getSearchResultsMock).toBeCalled();
  });

  it('should not call setSearchQuery on Mount if function is not valid', () => {
    shallow(<SearchBody ready results={results} setSearchQuery={null} getSearchResults={null} />);
    expect(setSearchQueryMock).not.toBeCalled();
    expect(getSearchResultsMock).not.toBeCalled();
  });

  it('should set the State onChange type select', () => {
    const wrapper = shallow(<SearchBody
      results={results}
      ready
      setFilterType={setFilterTypeMock}
      setPageNumber={setPageNumberMock}
    />);
    const instance = wrapper.instance();
    mockEvent.target.value = 'video';
    instance.filterByType(mockEvent);
    expect(wrapper.state().filter).toEqual('video');
    expect(setFilterTypeMock).toBeCalled();
    expect(setPageNumberMock).toBeCalled();
  });

  it('should not call setFilterType if not defined', () => {
    const wrapper = shallow(<SearchBody
      results={results}
      ready
      setFilterType={null}
      setPageNumber={null}
    />);
    const instance = wrapper.instance();
    mockEvent.target.value = 'video';
    instance.filterByType(mockEvent);
    expect(setFilterTypeMock).not.toBeCalled();
    expect(setPageNumberMock).not.toBeCalled();
  });

  it('should not render Placeholder if have results', () => {
    const wrapper = shallow(<SearchBody results={results} ready={false} />);
    expect(wrapper.find('SearchPlaceholder')).toHaveLength(0);
  });

  it('should render Placeholder if ready and is initial client fetch', () => {
    const wrapper = mount(<SearchBody results={[]} ready={false} />);
    wrapper.instance().fetchData();
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(wrapper.find('SearchPlaceholder')).toHaveLength(1);
  });

  it('should render results', () => {
    const wrapper = shallow(<SearchBody ready results={results} />);
    expect(wrapper.find('Results')).toHaveLength(1);
  });

  it('should set the State onChange date select', () => {
    const wrapper = shallow(<SearchBody
      results={results}
      ready
      setDateFilter={setDateFilterMock}
      setPageNumber={setPageNumberMock}
    />);
    const instance = wrapper.instance();
    mockEvent.target.value = 'month';
    instance.filterByDate(mockEvent);
    expect(wrapper.state().dateFilter).toEqual('month');
    expect(setDateFilterMock).toBeCalled();
    expect(setPageNumberMock).toBeCalled();
  });

  it('should not call setDateFilter if not defined', () => {
    const wrapper = shallow(<SearchBody
      results={results}
      ready
      setDateFilter={null}
      setPageNumber={null}
    />);
    const instance = wrapper.instance();
    mockEvent.target.value = 'month';
    instance.filterByDate(mockEvent);
    expect(setDateFilterMock).not.toBeCalled();
    expect(setPageNumberMock).not.toBeCalled();
  });

  it('should set the State onChange date select', () => {
    const wrapper = shallow(<SearchBody
      results={results}
      ready
      setPageNumber={setPageNumberMock}
    />);
    const instance = wrapper.instance();
    instance.handlePaginate(2);
    expect(wrapper.state().page).toEqual(2);
    expect(setPageNumberMock).toBeCalled();
  });

  it('should not call setPageNumber if not defined ', () => {
    const wrapper = shallow(<SearchBody results={results} ready setPageNumber={null} />);
    const instance = wrapper.instance();
    instance.handlePaginate(2);
    expect(setPageNumberMock).not.toBeCalled();
  });

  it('should call prop functions if defined', () => {
    const wrapper = shallow(<SearchBody
      ready
      results={results}
      getSearchResults={getSearchResultsMock}
      setFilterType={setFilterTypeMock}
      setSearchQuery={setSearchQueryMock}
      setPageNumber={setPageNumberMock}
      setDateFilter={setDateFilterMock}
    />);
    wrapper.instance().fetchData();
    expect(getSearchResultsMock).toBeCalled();
  });

  it('should not call all prop functions if not defined', () => {
    const wrapper = shallow(<SearchBody
      ready
      results={results}
      getSearchResults={null}
      setFilterType={null}
      setSearchQuery={null}
      setPageNumber={null}
      setDateFilter={null}
    />);
    wrapper.instance().fetchData();
    expect(getSearchResultsMock).not.toBeCalled();
  });

  it('should render river of results and pagination if there are results', () => {
    const wrapper = shallow(
      <SearchBody
        results={results}
        totalPages={11}
        totalResults={200}
        page={1}
      />
    );
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('should call fetchData when handleInputBlur is called', () => {
    const wrapper = shallow(<SearchBody
      ready
      results={results}
      setSearchQuery={setSearchQueryMock}
      setPageNumber={setPageNumberMock}
    />);
    const instance = wrapper.instance();
    const fetchDataSpy = spyOn(instance, 'fetchData').and.callThrough();
    instance.handleInputBlur(mockEvent);
    expect(fetchDataSpy).toHaveBeenCalled();
    mockEvent.target.tagName = 'FORM';
    mockEvent.target = {
      tagName: 'FORM',
      elements: {
        namedItem: jest.fn(() => ({ value: '' })),
      },
    };
    instance.handleSubmitForm(mockEvent);
    wrapper.setState({
      query: 'Colombia',
    });
    mockEvent.target = {
      value: 'Colombia',
    };
    instance.handleSubmitForm(mockEvent);
    expect(setSearchQueryMock).toBeCalled();
    expect(setPageNumberMock).toBeCalled();
  });

  it('should not call handleSubmitForm when handleInputBlur does not have value', () => {
    const wrapper = shallow(<SearchBody
      ready
      results={results}
      setSearchQuery={setSearchQueryMock}
      setPageNumber={setPageNumberMock}
    />);
    const handleSubmitFormFn = jest.spyOn(wrapper.instance(), 'handleSubmitForm');
    wrapper.instance().handleInputBlur({ target: { value: '' } });
    expect(handleSubmitFormFn).not.toHaveBeenCalled();
  });

  it('should not call searchResults if not defined', () => {
    const wrapper = shallow(<SearchBody
      ready
      results={results}
      setSearchQuery={null}
      setPageNumber={null}
    />);
    const instance = wrapper.instance();
    const fetchDataSpy = spyOn(instance, 'fetchData').and.callThrough();
    instance.handleInputBlur(mockEvent);
    expect(fetchDataSpy).toHaveBeenCalled();
    mockEvent.target.tagName = 'FORM';
    mockEvent.target = {
      tagName: 'FORM',
      elements: {
        namedItem: jest.fn(() => ({ value: '' })),
      },
    };
    instance.handleSubmitForm(mockEvent);
    wrapper.setState({
      query: 'Colombia',
    });
    mockEvent.target = {
      value: 'Colombia',
    };
    instance.handleSubmitForm(mockEvent);
    expect(setSearchQueryMock).not.toBeCalled();
    expect(setPageNumberMock).not.toBeCalled();
  });

  it('should call setSearchQuery and setPageNumberMock when update with new query prop', () => {
    const wrapper = mount(<SearchBody
      ready
      results={results}
      setSearchQuery={setSearchQueryMock}
      setPageNumber={setPageNumberMock}
    />);
    const fetchDataSpy = spyOn(wrapper.instance(), 'fetchData');
    // Changing query
    wrapper.setProps({ query: 'test' });
    expect(setSearchQueryMock).toBeCalled();
    expect(setPageNumberMock).toBeCalled();
    expect(fetchDataSpy).toHaveBeenCalled();
    // Changing query and removing callbacks
    wrapper.setProps({
      query: 'hello',
      setSearchQuery: null,
      setPageNumber: null,
    });
    expect(fetchDataSpy).toHaveBeenCalled();
    // Changing query and removing callbacks
    wrapper.setProps({
      query: 'hello',
      setSearchQuery: setSearchQueryMock,
    });
    expect(fetchDataSpy.calls.count()).toBe(2);
  });
});
