/* eslint-disable require-jsdoc */
import React from 'react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import preloadAll from 'jest-next-dynamic';
import { shallow, mount } from 'enzyme';

// eslint-disable-next-line no-restricted-imports
import configureStore from '@univision/fe-commons/dist/store/configureStore';
import SocialTracker from '@univision/fe-commons/dist/utils/tracking/tealium/social/SocialTracker';
import ArticleTracker from '@univision/fe-commons/dist/utils/tracking/tealium/article/ArticleTracker';
import LiveLabel from '@univision/fe-components-base/dist/components/LiveLabel';
import features from '@univision/fe-commons/dist/config/features';
import styled from 'styled-components';
import ArticleLead from '../ArticleLead';
import BodyChunk from '../../../base/BodyChunk';
import ConnectedArticle, { ArticleBody } from '.';
import { getTrackingProps } from '../ArticleContent/index';

import Styles from './ArticleBody.styles';

const store = configureStore();
jest.mock('@univision/fe-components-base/dist/components/CallButton', () => {
  const CallButton = orgProps => (
    <button type="button" onClick={orgProps.callBtnTracking}>call button</button>
  );

  return CallButton;
});
jest.mock('../ArticleAskExpert/CompanyBio', () => (() => (<div />)));
jest.mock('react-lazyload', () => jest.fn(orgProps => <div>{orgProps.children}</div>));

describe('ArticleBody tests', () => {
  let props;
  beforeAll(async () => {
    await preloadAll();
  });
  const articleTrackerScroll = getTrackingProps;
  beforeEach(() => {
    props = {
      requestParams: { showActionBar: 'false' },
      pageData: { data: { type: 'article', uri: 'https://www.univision.com/' }, site: 'univision', userLocation: 'US' },
      uid: 'uid',
      primaryTag: { name: 'topic' },
      title: 'title',
      lead: { type: 'image' },
      theme: {
        showCateogryTag: true,
      },
      body: [
        { type: 'text', value: '<p>hello</p>' },
        { type: 'text', value: '<p>world</p>' },
        {
          type: 'enhancement',
          enhancementData: {},
          objectData: {
            title: 'FC Barcelona - 2877 puntos',
            description: 'El Fútbol Club Barcelona, conocido popularmente como Barça, es una entidad polideportiva con sede en Barcelona, España. Fue fundado como club de fútbol el 29 de noviembre de 1899 y registrado oficialmente el 5 de enero de 1903',
            authorComments: null,
            price: 'Precio estimado 2000 millones $',
            type: 'listitem',
            sponsor: {
              name: 'Barbie Sponsor logo',
              leadText: null,
              link: null,
              image: {
                type: 'image',
                uid: '00000178-fb20-da74-adfe-ff671a1f0000',
                title: 'Barbie sponsor logo',
                caption: null,
                credit: null,
                renditions: {
                  original: {
                    href: 'https://uvn-brightspot.s3.amazonaws.com/0e/61/70ec40ed4cb3b7b61810e91b3a4a/bb-ycb20-lockup-primary.png',
                    width: 1521,
                    height: 783,
                  },
                },
              },
            },
            media: {
              type: 'image',
              uid: '00000175-15a0-de40-a9f7-d7a3cc3d0000',
              title: 'image.png',
              caption: null,
              credit: null,
              renditions: {
                original: {
                  href: 'https://uvn-brightspot.s3.amazonaws.com/30/ac/01a0ea464b3591711bb07cd474cd/image.png',
                  width: 1281,
                  height: 720,
                },
              },
            },
            eCommerceCtas: [
              {
                title: 'Mas informacion',
                link: {
                  href: 'https://www.youtube.com/',
                  target: '_blank',
                  text: 'Youtube',
                  uid: '0000017b-74a4-d138-af7b-f7fe88200000',
                },
              },
            ],
          },
        },
      ],
      device: 'desktop',
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
      secondaryTags: [],
      articleTrackerScroll,
    };
    isWorldCupMVPSpy = jest
      .spyOn(features.deportes, 'isWorldCupMVP')
      .mockReturnValue(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the breaking news label', () => {
    props.contentPriority = 'breaking_news';
    articleTrackerScroll({}).onMilestone([50, 100]);
    const wrapper = shallow(<ArticleBody {...props} />);
    expect(wrapper.find(LiveLabel)).toHaveLength(1);
  });
  it('renders the breaking news with articlebody', () => {
    props.contentPriority = 'breaking_news';
    articleTrackerScroll({}).onMilestone([50, 100]);
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
    expect(wrapper.find(BodyChunk)).toHaveLength(props.body.length + 1);
  });
  it('renders ArticleChunks for each item in body', () => {
    const wrapper = shallow(<ArticleBody {...props} articleType="list" authors={null} tempAuthors={null} />);
    expect(wrapper.find(BodyChunk)).toHaveLength(props.body.length);
  });

  it('does not fail if body is not defined', () => {
    props.body = null;
    articleTrackerScroll({}).onMilestone([50, 100]);
    const wrapper = shallow(<ArticleBody {...props} />);
    expect(wrapper.find(BodyChunk)).toHaveLength(0);
  });

  it('tracks Apply Button clicks', () => {
    jest.spyOn(ArticleTracker, 'track');
    articleTrackerScroll({}).onMilestone([50, 100]);
    const jobListingData = {
      applyUrl: 'https://abc.xyz/jobs/CTO',
    };
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedArticle
          title={props.title}
          uid={props.uid}
          primaryTag={props.primaryTag}
          secondaryTags={props.secondaryTags}
          pageData={props.pageData}
          articleType="joblisting"
          jobListingData={jobListingData}
        />
      </Provider>,
    );
    const button = wrapper.find({ href: jobListingData.applyUrl }).first();

    act(() => {
      button.simulate('click', 'facebook');
      wrapper.update();
    });

    expect(ArticleTracker.track).toBeCalled();
  });

  it('should render date and opinion if isOpinionArticle', () => {
    const pageData = {
      data: { opinionText: 'This is opinion text' },
    };
    const wrapper = shallow(<ArticleBody {...props} pageData={pageData} isOpinionArticle />);
    expect(wrapper.find('div.opinion')).toHaveLength(1);
  });

  it('should NOT render date and opinion if NOT OpinionArticle', () => {
    const pageData = {
      data: { opinionText: 'This is opinion text' },
    };
    const wrapper = shallow(<ArticleBody {...props} pageData={pageData} />);
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
      />,
    );
    expect(wrapper.find('RelatedTags')).toHaveLength(1);
  });

  it('should default to primary tag and not show it', () => {
    const wrapper = shallow(
      <ArticleBody
        {...props}
        primaryTag={
          {
            name: 'explora',
            link: 'https://performance.univision.com/explora',
          }
        }
        secondaryTags={[]}
      />,
    );
    expect(wrapper.find('RelatedTags')).toHaveLength(0);
  });

  it('should only render vix tag', () => {
    const wrapper = shallow(
      <ArticleBody
        {...props}
        primaryTag={
          {
            name: 'explora',
            link: 'https://performance.univision.com/explora',
          }
        }
        secondaryTags={[
          {
            name: 'Política',
            link: 'https://performance.univision.com/temas/politica',
          },
          {
            name: 'Vix',
            link: 'https://performance.univision.com/temas/vix',
          },
        ]}
      />,
    );
    expect(wrapper.find('RelatedTags')).toHaveLength(1);
  });

  it('should render taboola widget', () => {
    const pageData = {
      site: 'univision',
      data: {
        userLocation: 'US',
        type: 'article',
        uri: 'https://uat.x.univision.com/horoscopos/horoscopo-de-hoy-sabado-1-de-octubre-2022',
        analyticsData: {
          apps: {
            common: {
              section: 'horoscopos',
            },
          },
        },
      },
    };

    const wrapper = shallow(
      <ArticleBody
        {...props}
        pageData={pageData}
      />,
    );
    expect(wrapper.find('TaboolaContainer')).toHaveLength(1);
  });

  it('should not render Aplicar Button when articleType is joblisting and has no applyUrl', () => {
    const jobListingData = {
      applyUrl: '',
    };
    articleTrackerScroll({}).onMilestone([50, 100]);
    const wrapper = mount(
      <Provider store={store}>
        <ArticleBody
          title={props.title}
          uid={props.uid}
          primaryTag={props.primaryTag}
          secondaryTags={props.secondaryTags}
          pageData={props.pageData}
          articleType="joblisting"
          jobListingData={jobListingData}
          articleTrackerScrol={articleTrackerScroll}
        />
      </Provider>,
    );
    expect(wrapper.find('ApplyJobButton__ApplyJobBtnWrapper')).toHaveLength(0);
  });

  it('should render with recipe data', () => {
    const recipeData = {
      ingredients: [
        'sugar',
        'spice',
        'all things nice',
      ],
    };
    articleTrackerScroll({}).onMilestone([50, 100]);
    const wrapper = shallow(
      <ArticleBody
        title={props.title}
        uid={props.uid}
        pageData={props.pageData}
        primaryTag={props.primaryTag}
        secondaryTags={props.secondaryTags}
        recipeData={recipeData}
        articleTrackerScroll={articleTrackerScroll}
      />,
    );
    expect(wrapper.childAt(1).find({ ingredients: ['sugar', 'spice', 'all things nice'] })).toHaveLength(1);
  });

  it('should render ListItem', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ArticleBody
          articleType="listitem"
          {...props}
          primaryTag={props.primaryTag}
          secondaryTags={props.secondaryTags}
          title={props.title}
          uid={props.uid}
        />
      </Provider>,
    );
    expect(wrapper.find('listitem')).toHaveLength(0);
  });

  it('should render with related collection', () => {
    const relatedCollection = {
      foo: 'bar',
    };
    const wrapper = shallow(
      <ArticleBody
        {...props}
        title={props.title}
        uid={props.uid}
        primaryTag={props.primaryTag}
        secondaryTags={props.secondaryTags}
        relatedCollection={relatedCollection}
      />,
    );

    expect(wrapper.find('Memo(RelatedCollection)')).toHaveLength(1);
  });

  it('should track call Button', () => {
    const askExpertData = {
      phoneNumber: '(786) 486-9453',
      website: 'www.cloudcomput.com/dental',
    };

    const trackerSpy = jest.spyOn(ArticleTracker, 'track');
    articleTrackerScroll({}).onMilestone([50, 100]);
    const wrapper = mount(
      <Provider store={store}>
        <ArticleBody
          title={props.title}
          uid={props.uid}
          primaryTag={props.primaryTag}
          secondaryTags={props.secondaryTags}
          pageData={props.pageData}
          articleType="AskExpert"
          askExpertData={askExpertData}
          articleTrackerScrol={articleTrackerScroll}
        />
      </Provider>,
    );

    const CallButton = wrapper.find('CallButton');
    act(() => {
      CallButton.simulate('click');
      wrapper.update();
    });

    expect(CallButton).toHaveLength(1);
    expect(trackerSpy).toBeCalled();
  });

  it('renders actionbar ', () => {
    props.requestParams = {};
    const wrapper = shallow(<ArticleBody {...props} />);
    // Because we need to show 2 one in top and one in bot
    expect(wrapper.find('ActionBar')).toHaveLength(2);
  });

  it('Not tracks ShareBar clicks for article type', async () => {
    props.requestParams = { showActionBar: 'true' };
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<ArticleBody {...props} />);
    const ActionBarWrapper = wrapper.find('ActionBar').first();
    ActionBarWrapper.props().onShareButtonClick();
    expect(SocialTracker.track).not.toBeCalled();
  });

  it('tracks ShareBar clicks for article is  list type', async () => {
    props.requestParams = { showActionBar: 'true' };
    spyOn(SocialTracker, 'track');
    const wrapper = shallow(<ArticleBody {...props} articleType="list" />);
    const ActionBarWrapper = wrapper.find('ActionBar').first();
    ActionBarWrapper.props().onShareButtonClick();
    expect(SocialTracker.track).toBeCalled();
  });

  describe('TagLabel', () => {
    it('should render primary tag if it does not match title', () => {
      const pageData = { headerTitle: 'no match' };
      const wrapper = shallow(<ArticleBody {...props} pageData={pageData} />);
      expect(wrapper.find('.primaryTag')).toHaveLength(1);
    });
    it('should NOT render primary tag label if it matches title', () => {
      const pageData = { headerTitle: 'topic' };
      const wrapper = shallow(<ArticleBody {...props} pageData={pageData} />);
      expect(wrapper.find('.primaryTag')).toHaveLength(0);
    });
    it('should NOT render primary tag label if invalid', () => {
      const pageData = { headerTitle: 'topic' };
      const wrapper = shallow(<ArticleBody {...props} pageData={pageData} primaryTag={{}} />);
      expect(wrapper.find('.primaryTag')).toHaveLength(0);
    });
  });

  describe('ArticleBodyStyles', () => {
    let theme;

    beforeEach(() => {
      theme = {};
    });

    it('should load categoryTag styles', () => {
      const Tag = styled.div`${Styles.categoryTag}`;
      theme.categoryColor = '#fff';
      const wrapper = mount(<Tag theme={theme} />);
      expect(wrapper.find('div')).toHaveStyleRule('color', '#fff');
    });

    it('should apply default color for categoryTag when no categoryColor are set', () => {
      const Tag = styled.div`${Styles.categoryTag}`;
      const wrapper = mount(<Tag theme={theme} />);
      expect(wrapper.find('div')).toHaveStyleRule('color', '#000');
    });

    it('should load body styles', () => {
      const StyledDiv = styled.div`${Styles.body}`;
      const wrapper = mount(<StyledDiv theme={theme} />);
      expect(wrapper.find('div')).toHaveStyleRule('font-size', '1rem');
    });

    it('should set font-family poppins when isWorldCupMVP is true', () => {
      const StyledDiv = styled.div`${Styles.body}`;
      const wrapper = mount(<StyledDiv theme={theme} isWorldCupMVP />);
      expect(wrapper.find('div')).toHaveStyleRule('font-family', '\'Poppins\',sans-serif');
    });

    it('should apply color for b', () => {
      const StyledDiv = styled.div`${Styles.body}`;
      const wrapper = mount(<StyledDiv theme={theme}><b>demo</b></StyledDiv>);
      expect(getComputedStyle(wrapper.find('b').getDOMNode()).color).toEqual('rgb(0, 0, 0)');

      const StyledDiv2 = styled.div`${Styles.body}`;
      theme.custom = {
        b: '#fff',
      };
      const wrapper2 = mount(<StyledDiv2 theme={theme}><b>demo</b></StyledDiv2>);
      expect(getComputedStyle(wrapper2.find('b').getDOMNode()).color).toEqual('rgb(255, 255, 255)');
    });

    it('should apply color for a', () => {
      const StyledDiv = styled.div`${Styles.body}`;
      const customTheme = {
        ...theme,
      };

      customTheme.custom = {
        a: '#000',
        'a:hover': '#000',
      };

      const wrapper = mount(
        <StyledDiv theme={customTheme}>
          <a href="http://mocksite.com">
            demo
          </a>
        </StyledDiv>,
      );
      expect(getComputedStyle(wrapper.find('a').getDOMNode()).color).toEqual('rgb(0, 0, 0)');
    });
  });
});
