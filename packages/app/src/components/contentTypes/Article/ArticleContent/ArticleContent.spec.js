import React from 'react';
import { shallow } from 'enzyme';
import preloadAll from 'jest-next-dynamic';

import features from '@univision/fe-commons/dist/config/features';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import * as WithWidgets from '@univision/fe-components-base/dist/components/widgets/WithWidgets';
import insertionPoints from '@univision/fe-components-base/dist/components/widgets/WithWidgets/insertionPoints.json';
import ArticleContent, { getTrackingProps } from '.';

jest.mock('@univision/fe-commons/dist/assets/images/radio-default-360.jpg', () => jest.fn(() => 'default.jpg'));
jest.mock('@univision/fe-commons/dist/config/features', () => (
  {
    article: { infiniteScrolling: jest.fn() },
    content: {
      isSensitive: () => jest.fn(),
    },
    video: {
      isSingleVideoInstance: jest.fn(() => false),
    },
    slideshows: {
      horizontal: { limit: 5 },
    },
  }
));
jest.mock('../ArticleBody');

let articleData;
let pageData;

describe('ArticleContent tests', () => {
  beforeAll(async () => {
    await preloadAll();
  });

  beforeEach(() => {
    pageData = {};
    articleData = {
      lead: {
        renditions: {
          '16x9-sm': {
            href: 'https://cdn3.uvnimg.com/dims4/default/1bdc0e0/2147483647/thumbnail/480x270/quality/75/?url=https%3A%2F%2Fcdn2.uvnimg.com%2F52%2F9e%2Fb3c59cc947dfba1afc559c027752%2Fgettyimages-803446228.jpg',
          },
        },
      },
      widgets: {},
      secondaryTags: [
        {
          title: 'title',
          link: 'link',
        },
      ],
    };

    features.article.infiniteScrolling.mockReturnValue(true);
  });

  it('renders as expected', () => {
    const wrapper = shallow(<ArticleContent content={articleData} depth={2} pageData={pageData} />);
    expect(wrapper.find('.uvs-container')).toHaveLength(1);
  });

  it('sets sharingOptions if they exist in api', () => {
    const sharingOptions = { test: 'hello' };
    articleData.sharing = { options: sharingOptions };
    const wrapper = shallow(<ArticleContent content={articleData} pageData={pageData} />);
    expect(wrapper.find('WithWidgets').dive().childAt(0).props().sharingOptions).toEqual(sharingOptions);
  });

  it('should not trigger scroll events for unknown milestones', () => {
    spyOn(ArticleTracker, 'track');
    getTrackingProps({}).onMilestone([25, 75]);
    expect(ArticleTracker.track).not.toBeCalled();
  });

  it('should trigger halfScroll event', () => {
    spyOn(ArticleTracker, 'track');
    getTrackingProps({}).onMilestone([50]);
    const data = { primaryTag: undefined, title: undefined, uid: undefined };
    expect(ArticleTracker.track).toBeCalledWith(ArticleTracker.events.halfScroll, data);
  });

  it('should trigger fullSctroll event', () => {
    spyOn(ArticleTracker, 'track');
    getTrackingProps({}).onMilestone([100]);
    const data = { primaryTag: undefined, title: undefined, uid: undefined };
    expect(ArticleTracker.track).toBeCalledWith(ArticleTracker.events.fullScroll, data);
  });
  it('should trigger article read event', () => {
    spyOn(ArticleTracker, 'track');
    getTrackingProps({}, 1, true).onMilestone([100]);
    const data = {
      primaryTag: undefined,
      title: undefined,
      uid: undefined,
      articleDepth: 1,
    };
    expect(ArticleTracker.track).toBeCalledWith(ArticleTracker.events.articleRead, data);
  });

  it('should return the uri if it exists', () => {
    const uri = 'http://fe.integration.y.univision.com';
    articleData.uri = uri;
    const wrapper = shallow(<ArticleContent content={articleData} pageData={pageData} />);
    expect(wrapper.find('WithWidgets').dive().childAt(0).props().uri).toEqual(uri);
  });

  it('should have insertion points for widgets if it is a single article page', () => {
    const WithWidgetsSpy = jest.spyOn(WithWidgets, 'default');
    const expectedInsertionPoints = [
      insertionPoints.belowArticleBody,
      insertionPoints.belowContentBody,
    ];
    shallow(<ArticleContent content={articleData} depth={1} pageData={pageData} />);

    expect(WithWidgetsSpy).toHaveBeenCalledWith(expect.any(Object), expectedInsertionPoints);
  });

  it('should not have insertion points if it is not the second article on the infinite scroll page', () => {
    const WithWidgetsSpy = jest.spyOn(WithWidgets, 'default');
    const expectedInsertionPoints = [];
    const data = { ...articleData, nextItem: { uri: 'someotherarticlepage.com' } };
    shallow(<ArticleContent content={data} depth={1} pageData={pageData} />);

    expect(WithWidgetsSpy).toHaveBeenCalledWith(expect.any(Object), expectedInsertionPoints);
  });
});
