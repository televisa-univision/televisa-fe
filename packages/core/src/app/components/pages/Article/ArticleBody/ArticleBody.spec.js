import React from 'react';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';

import { shallow, mount } from 'enzyme';

import Store from '@univision/fe-commons/dist/store/store';
import * as storeHelpers from '@univision/fe-commons/dist/store/storeHelpers';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import LiveLabel from '@univision/fe-components-base/dist/components/LiveLabel';
import features from '@univision/fe-commons/dist/config/features';
import ActionBar from '@univision/fe-components-base/dist/components/ActionBar';
import mockData from '@univision/fe-components-base/dist/components/widgets/CrossVerticalList/__mocks__/crossVerticalListMockData.json';
import ArticleLead from '../ArticleLead/ArticleLead';
import ArticleChunk from '../ArticleChunk/ArticleChunk';
import ArticleBody from './ArticleBody';

jest.mock('../ArticleLead/ArticleLead', () => jest.fn());
jest.mock('../ArticleChunk/ArticleChunk', () => jest.fn());

describe('ArticleBody tests', () => {
  const mockPageData = { data: {} };
  let props;
  let getPageDataSpy;

  beforeEach(() => {
    features.actionBar.hasActionBar = jest.fn(() => false);
    props = {
      uid: 'uid',
      primaryTag: { name: 'topic' },
      title: 'title',
      lead: { type: 'image' },
      body: [
        { type: 'text', value: '<p>hello</p>' },
        { type: 'text', value: '<p>world</p>' },
      ],
      widgets: [mockData],
      authors: [
        {
          title: 'test',
          image: {
            renditions: {
              '16x9-sm': {
                href: 'test',
              },
            },
          },
        },
      ],
      tempAuthors: [
        {
          fullName: 'Temp',
          company: 'Company',
          designation: 'Publisher',
        },
      ],
      publishDate: new Date().toISOString(),
    };

    getPageDataSpy = jest.spyOn(storeHelpers, 'getPageData')
      .mockReturnValue(mockPageData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the breaking news label', () => {
    props.contentPriority = 'breaking_news';
    const wrapper = shallow(<ArticleBody {...props} />);
    expect(wrapper.find(LiveLabel)).toHaveLength(1);
  });

  it('renders a lead when available', () => {
    const wrapper = shallow(<ArticleBody {...props} />);
    expect(wrapper.find(ArticleLead)).toHaveLength(1);
    wrapper.setProps({ lead: null });
    expect(wrapper.find(ArticleLead)).toHaveLength(0);
  });

  it('renders ArticleChunks for each item in body', () => {
    const wrapper = shallow(<ArticleBody {...props} authors={null} tempAuthors={null} />);
    expect(wrapper.find(ArticleChunk)).toHaveLength(props.body.length + 1);
  });

  it('does not fail if body is not defined', () => {
    props.body = null;
    const wrapper = shallow(<ArticleBody {...props} />);
    expect(wrapper.find(ArticleChunk)).toHaveLength(0);
  });

  it('tracks Apply Button clicks', async () => {
    spyOn(ArticleTracker, 'track');
    const jobListingData = {
      applyUrl: 'https://abc.xyz/jobs/CTO',
    };
    const wrapper = mount(<ArticleBody
      articleType="joblisting"
      jobListingData={jobListingData}
    />);
    await Loadable.preloadAll();
    wrapper
      .find('ApplyJobButton__ApplyJobBtnWrapper')
      .first()
      .simulate('click', 'facebook');
    expect(ArticleTracker.track).toBeCalled();
  });

  it('should render date and opinion if isOpinionArticle', () => {
    getPageDataSpy.mockReturnValue({
      data: { opinionText: 'This is opinion text' },
    });
    const wrapper = shallow(<ArticleBody {...props} isOpinionArticle />);
    expect(wrapper.find('div.opinion')).toHaveLength(1);
  });

  it('should NOT render date and opinion if NOT OpinionArticle', () => {
    getPageDataSpy.mockReturnValue({
      data: { opinionText: 'This is opinion text' },
    });
    const wrapper = shallow(<ArticleBody {...props} />);
    expect(wrapper.find('div.opinion')).toHaveLength(0);
  });

  it('should NOT render date and opinion if isOpinionArticle but no `opinionText`', () => {
    const wrapper = shallow(<ArticleBody {...props} isOpinionArticle />);
    expect(wrapper.find('div.opinion')).toHaveLength(0);
  });

  it('should render secondary tags', () => {
    const wrapper = shallow(
      <ArticleBody
        {...props}
        secondaryTags={[
          {
            name: 'Política',
            link: 'https://performance.univision.com/temas/politica',
          },
        ]}
      />
    );
    expect(wrapper.find('RelatedTags')).toHaveLength(1);
  });

  it('should render with recipe data', async () => {
    const recipeData = {
      ingredients: [
        'sugar',
        'spice',
        'all things nice',
      ],
    };
    const wrapper = shallow(<ArticleBody {...props} recipeData={recipeData} />);
    await Loadable.preloadAll();
    expect(wrapper.find('LoadableComponent')
      .last()
      .props())
      .toEqual(recipeData);
  });

  it('should render with ask the expert data', async () => {
    const askExpertData = {
      phoneNumber: '(786) 486-9453',
      website: 'www.cloudcomput.com/dental',
    };
    const wrapper = shallow(
      <ArticleBody
        {...props}
        articleType="askExpert"
        askExpertData={askExpertData}
        secondaryTags={[]}
      />
    );
    await Loadable.preloadAll();
    expect(wrapper.find('LoadableComponent')
      .last()
      .props().askExpertData)
      .toEqual(askExpertData);
  });

  it('should render related collection component', async () => {
    const relatedCollection = {
      foo: 'bar',
    };
    const wrapper = shallow(
      <ArticleBody
        {...props}
        relatedCollection={relatedCollection}
        secondaryTags={[]}
      />
    );
    await Loadable.preloadAll();
    expect(wrapper.find('Memo(RelatedCollection)')).toHaveLength(1);
  });

  it('should render Apply Button when articleType is joblisting and has applyUrl', () => {
    const jobListingData = {
      applyUrl: 'https://abc.xyz/jobs/CTO',
    };

    const wrapper = mount(
      <ArticleBody
        articleType="joblisting"
        jobListingData={jobListingData}
      />
    );
    expect(wrapper.find('ApplyJobButton__ApplyJobBtnWrapper')).toHaveLength(2);
  });

  it('should not render Aplicar Button when articleType is joblisting and has no applyUrl', () => {
    const jobListingData = {
      applyUrl: '',
    };

    const wrapper = mount(
      <ArticleBody
        articleType="joblisting"
        jobListingData={jobListingData}
      />
    );
    expect(wrapper.find('ApplyJobButton__ApplyJobBtnWrapper')).toHaveLength(0);
  });

  it('should track call Button', () => {
    const askExpertData = {
      phoneNumber: '(786) 486-9453',
      website: 'www.cloudcomput.com/dental',
    };

    const trackerSpy = jest.spyOn(ArticleTracker, 'track');

    const wrapper = mount(
      <Provider store={Store}>
        <ArticleBody
          articleType="AskExpert"
          askExpertData={askExpertData}
          secondaryTags={[]}
        />
      </Provider>
    );

    const CallButton = wrapper.find('CallButton');
    act(() => {
      CallButton.first().simulate('click');
    });

    wrapper.update();
    expect(trackerSpy).toBeCalled();
  });

  describe('TagLabel', () => {
    it('should render primary tag if it does not match title', () => {
      getPageDataSpy.mockReturnValue({ headerTitle: 'no match' });
      const wrapper = shallow(<ArticleBody {...props} />);
      expect(wrapper.find('.primaryTag')).toHaveLength(1);
    });
    it('should NOT render primary tag label if it matches title', () => {
      getPageDataSpy.mockReturnValue({ headerTitle: 'topic' });
      const wrapper = shallow(<ArticleBody {...props} />);
      expect(wrapper.find('.primaryTag')).toHaveLength(0);
    });
    it('should NOT render primary tag label if invalid', () => {
      getPageDataSpy.mockReturnValue({ headerTitle: 'topic' });
      const wrapper = shallow(<ArticleBody {...props} primaryTag={{}} />);
      expect(wrapper.find('.primaryTag')).toHaveLength(0);
    });
  });
  it('renders actionbar ', () => {
    features.actionBar.hasActionBar.mockReturnValue(true);
    props.contentPriority = 'breaking_news';
    const wrapper = shallow(<ArticleBody {...props} />);
    // Because we need to show 2  one in top and one in bot
    expect(wrapper.find(ActionBar)).toHaveLength(2);
  });
  it('tracks ShareBar clicks', async () => {
    features.actionBar.hasActionBar.mockReturnValue(true);
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<ArticleBody {...props} />);
    await Loadable.preloadAll();
    const ActionBarWrapper = wrapper.find('ActionBar').first();
    ActionBarWrapper.props().onShareButtonClick();
    expect(SocialTracker.track).toBeCalled();
  });
});
