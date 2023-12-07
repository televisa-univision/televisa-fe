import React from 'react';
import { shallow, mount } from 'enzyme';
import Store from '@univision/fe-commons/dist/store/store';
import setPageData from '@univision/fe-commons/dist/store/actions/page-actions';
import request from '@univision/fe-commons/dist/utils/api/request';
import PollTracker from '@univision/fe-commons/dist/utils/tracking/tealium/poll/PollTracker';
import LocalStorage from '@univision/fe-commons/dist/utils/helpers/LocalStorage';
import promiseMock from '@univision/fe-commons/dist/utils/jest/helpers';
import Reaction from './Reaction';

jest.mock('@univision/fe-commons/dist/utils/api/request', () => jest.fn());
jest.useFakeTimers();

const props = {
  slideshowId: '123',
  slideId: '012b',
  pollQuestion: 'Test',
  pollOptions: [
    {
      uid: '123',
      internalName: '1234',
      type: 'polloptionicon',
      icon: {
        name: 'COOL',
      },
    },
    {
      uid: '234',
      internalName: '2345',
      type: 'polloptionicon',
      icon: {
        name: 'BIEN',
      },
    },
    {
      uid: '434',
      internalName: '3345',
      type: 'polloptionicon',
      icon: {
        name: 'QUEMAL',
      },
    }
  ],
  autoSlideChangeTime: 7,
  goToNext: jest.fn(),
};

const webAppPollOptions = [
  {
    uid: '111',
    internalName: '1111',
    type: 'webapppolloptionicon',
    icon: {
      name: 'ME_DIVIERTE',
    },
  },
  {
    uid: '222',
    internalName: '2222',
    type: 'webapppolloptionicon',
    icon: {
      name: 'ME_ENTRISTECE',
    },
  },
  {
    uid: '333',
    internalName: '3333',
    type: 'webapppolloptionicon',
    icon: {
      name: 'ME_GUSTA',
    },
  },
  {
    uid: '444',
    internalName: '4444',
    type: 'webapppolloptionicon',
    icon: {
      name: 'ME_ASOMBRA',
    },
  },
  {
    uid: '555',
    internalName: '5555',
    type: 'webapppolloptionicon',
    icon: {
      name: 'ME_DISGUSTA',
    },
  },
  {
    uid: '666',
    internalName: '6666',
    type: 'webapppolloptionicon',
    icon: {
      name: 'AFIRMACION',
    },
  },
  {
    uid: '777',
    internalName: '7777',
    type: 'webapppolloptionicon',
    icon: {
      name: 'NEGACION',
    },
  }
];

const mockData = {
  id: 'test-1',
  userVoteId: '1234',
  results: {
    1234: {
      percent: '12%',
    },
    2345: {
      percent: '15%'
    },
    3345: {
      percent: '12%'
    }
  }
};

/** @test {Reaction} */
describe('Reaction isolated test', () => {
  it('should call goToNext and update state after timeout', () => {
    request.mockReturnValueOnce(Promise.resolve({
      status: 'success',
      data: {
        userVoteId: '1234',
        results: {
          1234: {
            percent: '12%',
          },
          2345: {
            percent: '15%'
          }
        },
      }
    }));
    const mockFn = jest.fn();
    const wrapper = shallow(<Reaction {...props} autoSlideChangeTime={5} goToNext={mockFn} />);
    wrapper.instance().advanceSlideshow();
    jest.runTimersToTime(5000);
    expect(mockFn).toHaveBeenCalled();
    expect(wrapper.state().voteResponse).toEqual(null);
  });

  it('should go to next slide and update state if goToNextSlide is called', () => {
    request.mockReturnValueOnce(promiseMock({ resolve: 1 }));
    const wrapper = shallow(<Reaction {...props} />);
    const instance = wrapper.instance();
    const goToNextSlideSpy = jest.spyOn(instance, 'goToNextSlide');
    instance.goToNextSlide();
    expect(goToNextSlideSpy).toHaveBeenCalled();
    expect(wrapper.state('voteResponse')).toEqual(null);
  });
});

/** @test {Reaction} */
describe('Reaction', () => {
  beforeEach(() => {
    request.mockReturnValueOnce(promiseMock({
      resolve: {
        data: mockData
      }
    }));
  });

  it('should render without crashing', () => {
    const wrapper = shallow(<Reaction {...props} />);
    expect(wrapper).toBeDefined();
  });

  it('should count vote on button click', () => {
    const wrapper = shallow(<Reaction {...props} />);
    const instance = wrapper.instance();
    instance.countVote = jest.fn();
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(instance.countVote).toHaveBeenCalled();
  });

  it('should count vote on button click', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Reaction {...props} slideId={undefined} />);
    const instance = wrapper.instance();
    instance.countVote = jest.fn();
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(instance.countVote).toHaveBeenCalledTimes(0);
  });

  it('should not call goToNextSlide if theres no slideId', async() => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const noSlideId = {
      ...props,
      slideId: null
    };
    const wrapper = shallow(<Reaction {...noSlideId} />);
    const instance = wrapper.instance();
    const goToNextSlideSpy = jest.spyOn(instance, 'goToNextSlide');
    await wrapper.instance().countVote({ internalName: '1234' });
    expect(goToNextSlideSpy).toHaveBeenCalled();
  });

  it('should not call goToNextSlide if device is equal to desktop', async() => {
    console.error = jest.fn(); // eslint-disable-line no-console
    Store.dispatch(setPageData({
      device: 'desktop'
    }));
    const wrapper = shallow(<Reaction {...props} slideId={undefined} />);
    const instance = wrapper.instance();
    const goToNextSlideSpy = jest.spyOn(instance, 'goToNextSlide');
    await wrapper.instance().countVote({ internalName: '1234' });
    expect(goToNextSlideSpy).not.toHaveBeenCalled();
  });

  it('should track event on button click', () => {
    const wrapper = shallow(<Reaction {...props} />);
    const instance = wrapper.instance();
    instance.countVote = jest.fn();
    spyOn(PollTracker, 'track');
    wrapper
      .find('button')
      .first()
      .simulate('click');
    expect(PollTracker.track).toHaveBeenCalled();
  });

  it('should not track event if slideId does not exists', () => {
    console.error = jest.fn(); // eslint-disable-line no-console
    const wrapper = shallow(<Reaction {...props} slideId={undefined} />);
    const PollTrackerSpy = jest.spyOn(PollTracker, 'track');
    wrapper.instance().trackReaction();
    expect(PollTrackerSpy).not.toHaveBeenCalled();
  });

  it('should set isSelectedOption and response percentage if localStorage', () => {
    const wrapper = shallow(<Reaction {...props} />);
    LocalStorage.setObject(wrapper.instance().storageKey, { 'test-1': '1234' });
    wrapper.setState({
      voteResponse: {
        userVoteId: '1234',
        id: 'test-1',
        results: {
          1234: {
            percent: '12%',
          },
          2345: {
            percent: '15%'
          },
          3345: {
            percent: '12%'
          }
        },
      },
    });
    expect(wrapper.find('button').first().text()).toEqual('<Icon />12%');
  });

  it('should request previous vote and set in state', async () => {
    request.mockReturnValueOnce(promiseMock({
      resolve: {
        status: 'success',
        data: {
          id: 'test-1',
          userVoteId: '1234',
          results: {
            1234: {
              percent: '12%',
            },
            2345: {
              percent: '15%'
            },
            3345: {
              percent: '12%'
            }
          }
        }
      }
    }));
    const wrapper = shallow(<Reaction {...props} />);
    jest.runAllTimers();
    await wrapper.instance().requestPreviousVote('1234');
    expect(wrapper.state().voteResponse).toEqual(mockData);
  });

  it('should request previous vote on mount', () => {
    const wrapper = shallow(<Reaction {...props} />);
    const instance = wrapper.instance();
    instance.requestPreviousVote = jest.fn();
    instance.componentDidMount();
    expect(instance.requestPreviousVote).toHaveBeenCalled();
  });

  it('should request previous vote on slide change', () => {
    const wrapper = shallow(<Reaction {...props} />);
    const instance = wrapper.instance();
    instance.requestPreviousVote = jest.fn();
    instance.UNSAFE_componentWillUpdate({ slideId: '1421' });
    expect(instance.requestPreviousVote).toHaveBeenCalled();
  });

  it('should set the vote in state and advance the slideshow', async () => {
    const wrapper = shallow(<Reaction {...props} />);
    jest.runAllTimers();
    await wrapper.instance().countVote({ internalName: '1234' });
    await expect(wrapper.state().voteResponse).toEqual(mockData);
  });

  it('should clear timeout on unmount', () => {
    global.clearTimeout = jest.fn();
    const wrapper = shallow(<Reaction {...props} />);
    wrapper.instance().componentWillUnmount();
    expect(global.clearTimeout).toHaveBeenCalled();
  });

  it('should set the vote in local storage for successful requests', async () => {
    request.mockReturnValue(promiseMock({
      resolve: {
        status: 'success',
        data: {
          id: 'test-2',
          userVoteId: '1234',
          results: {
            1234: {
              percent: '12%',
            },
            2345: {
              percent: '15%'
            },
            3345: {
              percent: '12%'
            }
          }
        }
      }
    }));
    const wrapper = shallow(<Reaction {...props} />);
    jest.runAllTimers();
    await wrapper.instance().countVote({ internalName: '1234' });
    expect(LocalStorage.getObject(wrapper.instance().storageKey)['test-2']).toBe('1234');
  });

  it('should not set the vote in local storage for unsuccessful requests', async () => {
    request.mockReturnValue(promiseMock({
      resolve: {
        status: 'fail',
        data: {
          id: 'test-3',
          userVoteId: '1234',
          results: {
            1234: {
              percent: '12%',
            },
            2345: {
              percent: '15%'
            },
            3345: {
              percent: '12%'
            }
          }
        }
      }
    }));
    const wrapper = shallow(<Reaction {...props} />);
    jest.runAllTimers();
    await wrapper.instance().countVote({ internalName: '1234' });
    expect(LocalStorage.getObject(wrapper.instance().storageKey)['test-3']).toBe(undefined);
  });

  it('should clear the localStorage', () => {
    const data = {};
    for (let i = 0; i < 5000; i += 1) {
      data[i] = i;
    }
    LocalStorage.setObject('reactionSlides', data);
    spyOn(LocalStorage, 'remove');
    mount(<Reaction {...props} />);
    expect(LocalStorage.remove).toBeCalled();
  });

  it('should show results if poll is closed', async () => {
    LocalStorage.clear();
    request.mockReturnValueOnce(promiseMock({
      resolve: {
        data: {
          id: 'test-1',
          userVoteId: '1234',
          results: {
            1234: {
              percent: '12%',
            },
            2345: {
              percent: '15%'
            },
            3345: {
              percent: '12%'
            }
          }
        }
      }
    }));
    const wrapper = await shallow(<Reaction {...props} closedDate="2016-01-01" />);
    wrapper.setState({
      voteResponse: {
        userVoteId: '1234',
        id: 'test-1',
        results: {
          1234: {
            percent: '12%',
          },
          2345: {
            percent: '15%'
          },
          3345: {
            percent: '12%'
          }
        },
      },
    });

    expect(wrapper.find('button').first().text()).toEqual('<Icon />12%');
  });
  it('should get webAppPollOptions instead pollOptions', () => {
    const wrapper = shallow(<Reaction {...props} webAppPollOptions={webAppPollOptions} />);
    expect(wrapper).toBeDefined();
  });

  it('should save the storage key as an object if it doesn\'t exist', async () => {
    const wrapper = shallow(<Reaction {...props} />);
    wrapper.instance().storageKey = 'test';
    wrapper.instance().saveVote('123', '3');
    expect(LocalStorage.getObject(wrapper.instance().storageKey)['123']).toBe('3');
  });
});
