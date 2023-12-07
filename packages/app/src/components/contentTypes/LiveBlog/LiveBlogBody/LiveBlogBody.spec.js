import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import * as actions from '@univision/fe-commons/dist/store/actions/liveblog/liveblog-actions';

import LiveBlogTracker from '@univision/fe-commons/dist/utils/tracking/tealium/liveblog/LiveBlogTracker';
import RefreshButton from '@univision/fe-components-base/dist/components/RefreshButton';
import configureStore from '@univision/fe-commons/dist/store/configureStore';

import * as webApi from '../../../../services/webapi';
import ConnectedLiveBlogBody, { mapStateToProps, LiveBlogBody, mapDispatchToProps } from '.';

const store = configureStore();

jest.mock('../Post', () => () => 'post');
jest.mock('react-loadable');
jest.useFakeTimers();

const mockWindow = {
  location: {
    hash: '#1234',
  },
  addEventListener: jest.fn(),
};

const windowSpy = jest.spyOn(global, 'window', 'get');

windowSpy.mockImplementation(() => mockWindow);

describe('LiveBlogBody', () => {
  let props;
  let state;
  let getContent;

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(store, 'getState').mockReturnValue({
      page: {
        data: {
          posts: [],
        },
      },
    });
    getContent = jest.spyOn(webApi, 'getContent');
    props = {
      pageData: {
        data: {
          type: 'liveblog',
          title: 'Test Live Blog',
          description: 'Test Description',
          body: [
            {
              type: 'text',
              value: '<p>Sigue en directo el funeral de la reina Isabel II desde Londres.</p>',
            },
          ],
          options: {
            totalPosts: 1,
            activePageNumber: 1,
          },
          posts: [
            {
              uid: '1',
              updateDate: '2017-10-22T21:16:46-04:00',
            },
            {
              uid: '2',
              updateDate: '2017-10-24T21:16:46-04:00',
            },
            {
              uid: '3',
              updateDate: '2017-10-23T21:16:46-04:00',
            },
          ],
        },
        enablePagination: true,
        config: { syndicator: { content: '' } },
      },
      onUpdateLiveBlogContext: jest.fn(),
    };
    state = {
      page: {
        data: {
          type: 'liveblog',
          title: 'Test Live Blog',
          description: 'Test Description',
          body: [
            {
              type: 'text',
              value: '<p>Sigue en directo el funeral de la reina Isabel II desde Londres.</p>',
            },
          ],
          options: {
            totalPosts: 1,
            activePageNumber: 1,
          },
          posts: [
            {
              uid: '1',
              updateDate: '2017-10-22T21:16:46-04:00',
            },
            {
              uid: '2',
              updateDate: '2017-10-24T21:16:46-04:00',
            },
            {
              uid: '3',
              updateDate: '2017-10-23T21:16:46-04:00',
            },
          ],
        },
        enablePagination: true,
        config: { syndicator: { content: '' } },
      },
      onUpdateLiveBlogContext: jest.fn(),
    };
  });

  it('should render without crashing', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ConnectedLiveBlogBody {...props} />
      </Provider>,
    );
    expect(wrapper.exists()).toBe(true);
  });

  it('should map state to props correctly', () => {
    props = mapStateToProps(state);
    expect(props.pageData).toEqual(state.page);
  });

  it('should render a Feed + Pagination + ScrollToTop', () => {
    const wrapper = shallow(<LiveBlogBody {...props} />);
    expect(wrapper.find('Feed')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(1);
    expect(wrapper.find('ScrollToTop')).toHaveLength(1);
  });

  it('should render a Feed + ScrollToTop', () => {
    const modifiedProps = { ...props };
    modifiedProps.pageData.data.enablePagination = false;
    const wrapper = shallow(<LiveBlogBody {...modifiedProps} />);
    expect(wrapper.find('Feed')).toHaveLength(1);
    expect(wrapper.find('Pagination')).toHaveLength(0);
    expect(wrapper.find('ScrollToTop')).toHaveLength(1);
  });

  it('should render a refresh button with right props if there are new posts', () => {
    const wrapper = shallow(<LiveBlogBody {...props} />);
    wrapper.setState({ missingPostsLength: 5 });
    expect(wrapper.find('RefreshButton')).toHaveLength(1);
    expect(wrapper.find('RefreshButton').props().onClick).toBe(wrapper.instance().onRefreshClick);
  });

  describe('handleScrolling', () => {
    it('should update the verticalPosition every 3000px', () => {
      Object.defineProperty(global.window, 'scrollY', { value: 9000 });

      const wrapper = shallow(<LiveBlogBody {...props} />);
      const instance = wrapper.instance();

      const onNextVerticalPositionMock = jest.spyOn(instance, 'onNextVerticalPosition');
      instance.handleScrolling();

      expect(onNextVerticalPositionMock).toHaveBeenCalled();
      expect(wrapper.instance().verticalPosition).toBe(3);
    });

    it('should not update the verticalPosition if the user has not reached 3000px', () => {
      Object.defineProperty(global.window, 'scrollY', { value: 1000 });
      const wrapper = shallow(<LiveBlogBody {...props} />);
      spyOn(wrapper.instance(), 'onNextVerticalPosition');
      wrapper.instance().handleScrolling();

      expect(wrapper.instance().onNextVerticalPosition).not.toHaveBeenCalled();
      expect(wrapper.instance().verticalPosition).toBe(0);
    });

    it('should scroll to anchor if url has hash', () => {
      global.location.hash = '#123456';
      const scrollIntoView = jest.fn();
      document.getElementById = () => ({ scrollIntoView });
      shallow(<LiveBlogBody {...props} />);
      jest.runTimersToTime(3500);
      expect(scrollIntoView).toHaveBeenCalled();
    });
  });

  describe('onNextVerticalPosition', () => {
    it('should trigger the start event and then the advance event', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      spyOn(LiveBlogTracker, 'track');
      wrapper.instance().onNextVerticalPosition();
      expect(LiveBlogTracker.track).toHaveBeenCalledWith(
        LiveBlogTracker.events.start,
        wrapper.instance().getTrackingData(),
      );

      wrapper.instance().onNextVerticalPosition();
      expect(LiveBlogTracker.track).toHaveBeenCalledWith(
        LiveBlogTracker.events.advance,
        wrapper.instance().getTrackingData(),
      );
    });
  });

  describe('updateCurrentPosts', () => {
    it('should update the state with the new data', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      wrapper.instance().newData = {};
      wrapper.instance().updateCurrentPosts();
      expect(wrapper.instance().pageData).toEqual({});
    });

    it('should scroll to the most recent post', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      wrapper.instance().mostRecentPostRef = {
        scrollIntoView: jest.fn(),
      };
      wrapper.instance().newData = {};
      wrapper.instance().updateCurrentPosts({
        scrollTo: wrapper.instance().mostRecentPostRef,
      });
      expect(wrapper.instance().mostRecentPostRef.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
      });
    });
  });

  describe('handlePaginate', () => {
    it('should go to the next page', async () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      spyOn(LiveBlogTracker, 'track');
      await wrapper.instance().handlePaginate(2);
      expect(LiveBlogTracker.track).toHaveBeenCalledWith(
        LiveBlogTracker.events.nextPage,
        expect.any(Object),
      );
    });

    it('should go to the previous page', async () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      spyOn(LiveBlogTracker, 'track');
      wrapper.setState({ activePageNumber: 2 });
      await wrapper.instance().handlePaginate(1);
      expect(LiveBlogTracker.track).toHaveBeenCalledWith(
        LiveBlogTracker.events.prevPage,
        expect.any(Object),
      );
    });

    it('should do nothing for an invalid page', async () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      spyOn(LiveBlogTracker, 'track');
      await wrapper.instance().handlePaginate(0);
      expect(LiveBlogTracker.track).not.toHaveBeenCalledWith(
        LiveBlogTracker.events.prevPage,
        expect.any(Object),
      );
      expect(LiveBlogTracker.track).not.toHaveBeenCalledWith(
        LiveBlogTracker.events.nextPage,
        expect.any(Object),
      );
    });
  });

  describe('fetchData', () => {
    it('should update the missing posts count if there are new posts', async () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      getContent.mockReturnValueOnce(Promise.resolve({
        data: {
          options: {
            totalPosts: 10,
            pageNumber: 1,
          },
        },
      }));
      await wrapper.instance().fetchData();
      expect(wrapper.state('missingPostsLength')).toBe(9); // 10 - 1
    });

    it('should update the active page number if we are in a different page', async () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      await wrapper.instance().handlePaginate(2);
      getContent.mockReturnValueOnce(Promise.resolve({
        data: {
          options: {
            totalPosts: 1,
            pageNumber: 2,
          },
        },
      }));
      await wrapper.instance().fetchData();
      expect(wrapper.state('activePageNumber')).toBe(2);
    });
  });

  describe('onRefreshClick', () => {
    it('should update the data', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      spyOn(wrapper.instance(), 'updateCurrentPosts');
      wrapper.setState({ missingPostsLength: 5 });
      wrapper.find(RefreshButton).simulate('click');
      expect(wrapper.instance().updateCurrentPosts).toHaveBeenCalled();
    });
    it('should fetch the data if we are not in the first page', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      spyOn(wrapper.instance(), 'fetchData');
      wrapper.setState({
        activePageNumber: 2,
        missingPostsLength: 5,
      });
      wrapper.find(RefreshButton).simulate('click');
      expect(wrapper.instance().fetchData).toHaveBeenCalledWith(1);
    });
  });

  describe('componentWillUnmount', () => {
    it('should remove listeners and intervals', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      spyOn(global, 'clearInterval');
      wrapper.instance().componentWillUnmount();
      expect(global.clearInterval).toHaveBeenCalled();
    });
  });

  describe('setMostRecentPost', () => {
    it('should update the reference to the most recent post', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      const lastPost = 'lastPost';
      wrapper.instance().setMostRecentPost(lastPost);
      expect(wrapper.instance().mostRecentPostRef).toBe(lastPost);
    });
  });

  describe('getMissingPostsLength', () => {
    it('should return how many posts have been updated', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      wrapper.instance().newData = {
        posts: [{ uid: 'ruben', updateDate: '000' }],
      };
      expect(wrapper.instance().getMissingPostsLength()).toBe(1);
    });

    it('should return how many posts have been added', () => {
      const wrapper = shallow(<LiveBlogBody {...props} />);
      wrapper.instance().newData = {
        options: {
          totalPosts: 10,
        },
      };
      expect(wrapper.instance().getMissingPostsLength()).toBe(9);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should dispatch an action when onUpdateLiveBlogContext is called', () => {
      const updateLiveBlogContext = jest.spyOn(actions, 'updateLiveBlogContext');
      const spyDispatch = jest.spyOn(store, 'dispatch');
      const receivedActions = mapDispatchToProps(spyDispatch);

      act(() => {
        receivedActions.onUpdateLiveBlogContext({});
      });
      expect(spyDispatch).toBeCalled();
      expect(updateLiveBlogContext).toHaveBeenCalledWith({});
    });
  });
});
