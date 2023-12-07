import React from 'react';
import { shallow, mount } from 'enzyme';

import mockPageApiData from '../__mocks__/mockSearchPageApiData.json';
import SearchBody from '.';

const mockEvent = {
  preventDefault: jest.fn(),
  target: {},
};

const fetchSearchResultsMock = jest.fn();
const setSearchQueryMock = jest.fn();
const setFilterTypeMock = jest.fn();
const setDateFilterMock = jest.fn();
const setPageNumberMock = jest.fn();
let props;

jest.mock('../../../base/Placeholders/ContentListPlaceholder');

describe('Search Body Spec', () => {
  props = {
    pageData: { data: mockPageApiData.data, device: 'mobile' },
    search: {
      dateFilter: 'all',
      filter: null,
      page: 1,
      query: 'coronavirus',
      ready: true,
      totalPages: 78,
      totalResults: 772,
      results: [
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
      ],
    },
  };

  beforeEach(() => {
    setSearchQueryMock.mockClear();
    setFilterTypeMock.mockClear();
    setDateFilterMock.mockClear();
    setPageNumberMock.mockClear();
  });

  afterAll(() => {
    jest.clearAllTimers();
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<SearchBody {...props} ready />);
    expect(wrapper).toBeDefined();
  });

  it('should return an empty div if there is not page data', () => {
    const wrapper = shallow(<SearchBody search={{}} pageData={{}} />);
    expect(wrapper.type()).toEqual(null);
  });

  it('should render sidebar if the device is desktop', () => {
    const wrapper = shallow(
      <SearchBody
        {...props}
        pageData={{ ...props.pageData, device: 'desktop' }}
        search={{ ...props.search, ready: false }}
      />,
    );
    expect(wrapper.find('Sidebar').length).toBe(1);
  });

  it('should call functions', () => {
    const wrapper = shallow(
      <SearchBody
        {...props}
        setSearchQuery={setSearchQueryMock}
        setPageNumber={setPageNumberMock}
      />,
    ).instance();
    wrapper.componentDidUpdate({ search: { query: '' } });
    expect(setSearchQueryMock).toBeCalled();
    expect(setPageNumberMock).toBeCalled();
  });

  it('should not call setSearchQuery on didUpdate if function is not valid', () => {
    const wrapper = shallow(
      <SearchBody {...props} setSearchQuery={null} setPageNumber={null} />,
    ).instance();
    wrapper.componentDidUpdate({ search: { query: '' } });
    expect(setSearchQueryMock).not.toBeCalled();
    expect(setPageNumberMock).not.toBeCalled();
  });

  it('should set the State onChange type select', () => {
    const wrapper = shallow(<SearchBody
      {...props}
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
      {...props}
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
    const wrapper = shallow(<SearchBody {...props} search={{ ...props.search, ready: false }} />);
    expect(wrapper.find('SearchPlaceholder')).toHaveLength(0);
  });

  it('should render Placeholder if ready and is initial client fetch', () => {
    const wrapper = mount(<SearchBody
      {...props}
      search={{ ...props.search, results: [], ready: false }}
    />);
    wrapper.instance().fetchData();
    wrapper.instance().forceUpdate();
    wrapper.update();
    expect(wrapper.find('SearchPlaceholder')).toHaveLength(1);
  });

  it('should render results', () => {
    const wrapper = shallow(<SearchBody {...props} />);
    expect(wrapper.find('Results')).toHaveLength(1);
  });

  it('should set the State onChange date select', () => {
    const wrapper = shallow(<SearchBody
      {...props}
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
      {...props}
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
      {...props}
      setPageNumber={setPageNumberMock}
    />);
    const instance = wrapper.instance();
    instance.handlePaginate(2);
    expect(wrapper.state().page).toEqual(2);
    expect(setPageNumberMock).toBeCalled();
  });

  it('should not call setPageNumber if not defined ', () => {
    const wrapper = shallow(<SearchBody {...props} setPageNumber={null} />);
    const instance = wrapper.instance();
    instance.handlePaginate(2);
    expect(setPageNumberMock).not.toBeCalled();
  });

  it('should call prop functions if defined', () => {
    const wrapper = shallow(<SearchBody
      {...props}
      setFilterType={setFilterTypeMock}
      setSearchQuery={setSearchQueryMock}
      setPageNumber={setPageNumberMock}
      setDateFilter={setDateFilterMock}
      fetchSearchResults={fetchSearchResultsMock}
    />);
    wrapper.instance().fetchData();
    expect(fetchSearchResultsMock).toBeCalled();
  });

  it('should render river of results and pagination if there are results', () => {
    const wrapper = shallow(
      <SearchBody
        {...props}
        search={{
          ...props.search,
          totalPages: 11,
          totalResults: 200,
          page: 1,
        }}
      />,
    );
    expect(wrapper.find('Pagination').length).toBe(1);
  });

  it('should call fetchData when handleInputBlur is called', () => {
    const wrapper = shallow(<SearchBody
      {...props}
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
      {...props}
      setSearchQuery={setSearchQueryMock}
      setPageNumber={setPageNumberMock}
    />);
    const handleSubmitFormFn = jest.spyOn(wrapper.instance(), 'handleSubmitForm');
    wrapper.instance().handleInputBlur({ target: { value: '' } });
    expect(handleSubmitFormFn).not.toHaveBeenCalled();
  });

  it('should not call searchResults if not defined', () => {
    const wrapper = shallow(<SearchBody
      {...props}
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
    const wrapper = shallow(<SearchBody
      {...props}
      setSearchQuery={setSearchQueryMock}
      setPageNumber={setPageNumberMock}
    />);
    const fetchDataSpy = spyOn(wrapper.instance(), 'fetchData');
    // Changing query
    wrapper.setProps({ search: { query: 'test' } });
    expect(setSearchQueryMock).toBeCalled();
    expect(setPageNumberMock).toBeCalled();
    expect(fetchDataSpy).toHaveBeenCalled();
    // Changing query and removing callbacks
    wrapper.setProps({
      search: { query: 'hello' },
      setSearchQuery: null,
      setPageNumber: null,
    });
    expect(fetchDataSpy).toHaveBeenCalled();
    // Changing query and removing callbacks
    wrapper.setProps({
      search: { query: 'hello' },
      setSearchQuery: setSearchQueryMock,
    });
    expect(fetchDataSpy.calls.count()).toBe(2);
  });

  it('should call setSearchQuery and fetchData when notFoundPath is passed on mount', () => {
    mount(<SearchBody
      {...props}
      setSearchQuery={setSearchQueryMock}
      pageData={{ notFoundPath: '/vacuna' }}
      fetchSearchResults={fetchSearchResultsMock}
    />);
    expect(setSearchQueryMock).toBeCalled();
    expect(fetchSearchResultsMock).toHaveBeenCalled();
  });

  it('should not call setSearchQuery when notFoundPath does not have query on mount', () => {
    mount(<SearchBody
      {...props}
      setSearchQuery={setSearchQueryMock}
      pageData={{ notFoundPath: '/' }}
      fetchSearchResults={fetchSearchResultsMock}
    />);
    expect(setSearchQueryMock).not.toBeCalled();
  });
});
